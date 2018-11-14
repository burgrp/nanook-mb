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
        title: title
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
        this.setLocal(temp);
    }

    regs[name] = reg;
    tickers.push(reg);
}

function createIasRegisters(side, address, sideTitle) {
    let regFlow = Register.add(regPrefix + side + "WaterFlow", RegisterVariable.create(undefined), {
        title: sideTitle + " Side Water Flow"
    });
    
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

Timer.set(1000, Timer.REPEAT, function () {
    for (let i in tickers) {
        tickers[i].tick();
    }
}, null);
