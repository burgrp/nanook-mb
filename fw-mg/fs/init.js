load("api_timer.js");
load("api_log.js");
load("api_i2c.js");
load("api_df_reg.js");
load("api_df_reg_var.js");

let regPrefix = "nanook.";

let regs = {};
let bus = I2C.get();

function createLm75aRegister(name, address, title) {
    let reg = Register.add(regPrefix + name, RegisterVariable.create(undefined), {
        title: title
    });
    reg.address = address;
    reg.name = name;
    
    reg.update = function() {
        Log.info("LM75 update " + this.name);
        let data = I2C.read(bus, this.address, 2, true);
        let temp = (((data.at(0) << 8) | data.at(1)) * 0.125) / 32;        
        //Log.info(this.name + ": " + JSON.stringify(temp));
        this.setLocal(temp);
    }
    
    regs[name] = reg;
}

createLm75aRegister("coldWaterIn", 0x48, "Cold Side Water Inlet");
createLm75aRegister("coldWaterOut", 0x49, "Cold Side Water Outlet");
createLm75aRegister("coldFrigoIn", 0x4A, "Cold Side Refrigerant Inlet");
createLm75aRegister("coldFrigoOut", 0x4B, "Cold Side Refrigerant Outlet");
createLm75aRegister("hotFrigoIn", 0x4C, "Hot Side Refrigerant Inlet");
createLm75aRegister("hotFrigoOut", 0x4D, "Hot Side Refrigerant Outlet");
createLm75aRegister("hotWaterIn", 0x4E, "Hot Side Water Inlet");
createLm75aRegister("hotWaterOut", 0x4F, "Hot Side Water Outlet");

Timer.set(1000, Timer.REPEAT, function () {

    for (let name in regs) {
        regs[name].update();
    }

}, null);
