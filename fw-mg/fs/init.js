load("api_timer.js");
load("api_log.js");
load("api_i2c.js");
load("api_df_reg.js");
load("api_df_reg_var.js");

let regPrefix = "nanook.";

let regs = {};
let tickers = [];
let bus = I2C.get();

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
        let data = I2C.read(bus, this.address, 2, true);
        if (data) {
            let intVal = ((data.at(0) << 8) | data.at(1)) >> 5;
            if (intVal & 0x0400) {
                intVal = - (~intVal & 0x3FF);
            }
            temp = intVal * 0.125;
        }
        //Log.info(this.name + ": " + JSON.stringify(temp));
        this.setLocal(Math.round(temp * 10) / 10);
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
            let data = I2C.read(bus, this.address, 6, true);
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

Timer.set(2000, Timer.REPEAT, function () {
    for (let i in tickers) {
        tickers[i].tick();
    }
}, null);
