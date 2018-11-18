load("api_timer.js");
load("api_log.js");
load("api_i2c.js");
load("api_df_reg.js");
load("api_df_reg_var.js");

let regPrefix = "nanook.";

let regs = {};
let tickers = [];
let bus = I2C.get();

function i2cRead(address, length) {
    for (let t = 0; t < 5; t++) {
        let data = I2C.read(bus, address, length, true);
        if (data) {
            return data;
        }
    }
    Log.error("Error reading I2C address " + JSON.stringify(address));
}

function createLm75aRegister(name, address, title) {
    let reg = Register.add(regPrefix + name, RegisterVariable.create(undefined), {
        title: title,
        unit: "°C"
    });
    reg.address = address;
    reg.name = name;

    reg.tick = function () {
        //Log.info("LM75 update " + this.name);
        let temp;
        let data = i2cRead(this.address, 2, true);
        if (data) {
            let intVal = ((data.at(0) << 8) | data.at(1)) >> 5;
            if (intVal & 0x0400) {
                intVal = - (~intVal & 0x3FF);
            }
            temp = intVal * 0.125;
            this.setLocal(Math.round(temp * 10) / 10);
        } else {
            this.setLocal(undefined);
        }
        //Log.info(this.name + ": " + JSON.stringify(temp));
    }

    regs[name] = reg;
    tickers.push(reg);
}

function convertPressure(raw, min, max, cal) {
    let voltage = 5 * raw / 4096;
    if (voltage < 0.35) {
        return undefined;
    } else {
        let bars = ((voltage - 0.5) / 4 * (max - min) + min + (cal)) / 1000;
        return Math.round(bars * 10) / 10;
    }
}

function createIasRegisters(side, address, sideTitle) {

    let regWaterFlow = Register.add(regPrefix + side + "WaterFlow", RegisterVariable.create(undefined), {
        title: sideTitle + " Side Water Flow",
        unit: "l/h"
    });
    regWaterFlow.setRaw = function (raw) {
        this.setLocal(raw * 60 * 60 / 1000);
    }
    regWaterFlow.mlPerRev = Cfg.get("ias." + side + ".waterFlow.mlPerRev");

    let regWaterPressure = Register.add(regPrefix + side + "WaterPressure", RegisterVariable.create(undefined), {
        title: sideTitle + " Side Water Pressure",
        unit: "bar"
    });
    regWaterPressure.setRaw = function (raw) {
        this.setLocal(convertPressure(raw, this.min, this.max, this.cal));
    }
    regWaterPressure.min = Cfg.get("ias." + side + ".waterPressure.min");
    regWaterPressure.max = Cfg.get("ias." + side + ".waterPressure.max");
    regWaterPressure.cal = Cfg.get("ias." + side + ".waterPressure.cal");

    let regFrigoPressure = Register.add(regPrefix + side + "FrigoPressure", RegisterVariable.create(undefined), {
        title: sideTitle + " Side Refrigerant Pressure",
        unit: "bar"
    });
    regFrigoPressure.setRaw = function (raw) {
        this.setLocal(convertPressure(raw, this.min, this.max, this.cal));
    }
    regFrigoPressure.min = Cfg.get("ias." + side + ".frigoPressure.min");
    regFrigoPressure.max = Cfg.get("ias." + side + ".frigoPressure.max");
    regFrigoPressure.cal = Cfg.get("ias." + side + ".frigoPressure.cal");

    let ticker = {
        address: address,
        regWaterFlow: regWaterFlow,
        regWaterPressure: regWaterPressure,
        regFrigoPressure: regFrigoPressure,

        tick: function () {
            let data = i2cRead(this.address, 6, true);
            if (data) {
                this.regWaterFlow.setRaw(data.at(1) << 8 | data.at(0));
                this.regWaterPressure.setRaw(data.at(3) << 8 | data.at(2));
                this.regFrigoPressure.setRaw(data.at(5) << 8 | data.at(4));
            } else {
                this.regWaterFlow.setLocal(undefined);
                this.regWaterPressure.setLocal(undefined);
                this.regFrigoPressure.setLocal(undefined);
            }
        }
    };

    regs[side + "WaterFlow"] = regWaterFlow;
    regs[side + "WaterPressure"] = regWaterPressure;
    regs[side + "FrigoPressure"] = regFrigoPressure;

    tickers.push(ticker);
}

function createObpRegisters(address) {

    let compressorRelay = Register.add(regPrefix + "compressorRelay", RegisterVariable.create(undefined), { title: "Compressor Relay" });
    let coldWaterPump = Register.add(regPrefix + "coldWaterPump", RegisterVariable.create(undefined), { title: "Cold Water Pump" });
    let hotWaterPump = Register.add(regPrefix + "hotWaterPump", RegisterVariable.create(undefined), { title: "Hot Water Pump" });
    let eevFault = Register.add(regPrefix + "eevFault", RegisterVariable.create(undefined), { title: "EEV Fault" });
    let i2cAlert = Register.add(regPrefix + "i2cAlert", RegisterVariable.create(undefined), { title: "I2C Alert" });
    let pwrOk = Register.add(regPrefix + "pwrOk", RegisterVariable.create(undefined), { title: "Power OK" });
    let psLow = Register.add(regPrefix + "psLow", RegisterVariable.create(undefined), { title: "Low pressure Switch" });
    let psHigh = Register.add(regPrefix + "psHigh", RegisterVariable.create(undefined), { title: "High pressure Switch" });
    let eevPosition = Register.add(regPrefix + "eevPosition", RegisterVariable.create(undefined), { title: "EEV Position" });

    let ticker = {
        address: address,

        compressorRelay: compressorRelay,
        coldWaterPump: coldWaterPump,
        hotWaterPump: hotWaterPump,
        eevFault: eevFault,
        i2cAlert: i2cAlert,
        pwrOk: pwrOk,
        psLow: psLow,
        psHigh: psHigh,
        eevPosition: eevPosition,

        tick: function () {
            let data = i2cRead(this.address, 1 + 1 + 4);

            if (data) {

                let outputs = data.at(0);
                this.compressorRelay.setLocal((outputs & 1) !== 0);
                this.coldWaterPump.setLocal((outputs & 2) !== 0);
                this.hotWaterPump.setLocal((outputs & 4) !== 0);

                let inputs = data.at(1);
                this.eevFault.setLocal((inputs & 1) !== 0);
                this.i2cAlert.setLocal((inputs & 2) !== 0);
                this.pwrOk.setLocal((inputs & 4) !== 0);
                this.psLow.setLocal((inputs & 8) !== 0);
                this.psHigh.setLocal((inputs & 16) !== 0);

                this.eevPosition.setLocal(
                    data.at(5) << 24 |
                    data.at(4) << 16 |
                    data.at(3) << 8 |
                    data.at(2)
                );

            } else {
                this.compressorRelay.setLocal(undefined);
                this.coldWaterPump.setLocal(undefined);
                this.hotWaterPump.setLocal(undefined);
                this.eevFault.setLocal(undefined);
                this.i2cAlert.setLocal(undefined);
                this.pwrOk.setLocal(undefined);
                this.psLow.setLocal(undefined);
                this.psHigh.setLocal(undefined);
                this.eevPosition.setLocal(undefined);
            }
        }
    };

    tickers.push(ticker);
}

function createCommandRegister(name, dlgCallback) {
    let reg = Register.add(regPrefix + name, RegisterVariable.create(undefined));
    reg.observer = {
        orig: reg.observer,
        dlgCallback: dlgCallback,
        reg: reg,
        callback: function (value) {
            if (this.dlgCallback && value !== undefined) {
                this.dlgCallback(value);
            }
            this.orig.callback(value);
            this.reg.setLocal(undefined);
        }
    }
}

createLm75aRegister("coldWaterIn", 0x48, "Cold Side Water Inlet");
createLm75aRegister("coldWaterOut", 0x49, "Cold Side Water Outlet");
createLm75aRegister("coldFrigoIn", 0x4A, "Cold Side Refrigerant Inlet");
createLm75aRegister("coldFrigoOut", 0x4B, "Cold Side Refrigerant Outlet");
createLm75aRegister("hotFrigoIn", 0x4C, "Hot Side Refrigerant Inlet");
createLm75aRegister("hotFrigoOut", 0x4D, "Hot Side Refrigerant Outlet");
createLm75aRegister("hotWaterIn", 0x4E, "Hot Side Water Inlet");
createLm75aRegister("hotWaterOut", 0x4F, "Hot Side Water Outlet");

createIasRegisters("cold", 0x70, "Cold");
createIasRegisters("hot", 0x71, "Hot");

createObpRegisters(0x74);

createCommandRegister("led", function (params) {
    Log.info("LED: " + JSON.stringify(params));
});

//let tickerIndex = 0;

function tick() {
    Log.info("tick " + JSON.stringify(tickerIndex));
    for (let t in tickers) {
        tickers[t].tick();
    }
    // Log.info("tick " + JSON.stringify(tickerIndex));
    // tickers[tickerIndex++].tick();
    // if (tickerIndex === tickers.length) {
    //     tickerIndex = 0;
    // }
    Timer.set(100, 0, tick, null);
}

tick();
