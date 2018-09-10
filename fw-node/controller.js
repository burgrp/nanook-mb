const createRegister = require("./register.js");

module.exports = async config => {

    let registers;

    const SystemMode = {
        OS_BOOTED: {
            name: "Operating system booted",
            async enter() {
                await registers.systemMode.set(SystemMode.STAND_BY);
            }
        },
        STAND_BY: {
            name: "Stand by",            
            led: [50, 0, 50, 50, 0, 50, 255],
            async enter() {
            }            
        },
        RAMP_UP: {
            name: "Ramp up",
            led: [5, 0, 5, 0, 100, 255, 0],
            async enter() {
                
            }
        },
        WORKING: {
            name: "Working",
            led: [50, 50, 50, 0, 100, 255, 0],
            async enter() {
                
            }
        },
        RAMP_DOWN: {
            name: "Ramp down",
            led: [5, 0, 5, 0, 0, 50, 255],
            async enter() {
                
            }
        },
        ERROR: {
            name: "Shut down",
            led: [10, 0, 10, 0, 255, 0, 0],
            async enter() {

            }
        }
    }

    Object.entries(SystemMode).forEach(([k, v]) => v.key = k);

    registers = [
        createRegister("systemMode", "System Mode", SystemMode.OS_BOOTED),
        createRegister("systemError", "System Error", undefined),
        createRegister("shouldWork", "Should Work", false),
        ...config.peripherals.registers
    ];

    registers = registers.reduce((map, reg) => { 
        map[reg.key] = reg;
        return map;
    }, {});

    async function asyncWait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return {

        registers,

        async start() {
            console.info("Starting controller...");

            Object.values(registers).forEach(register => {
                register.watch(async () => {
                    if (register.error) {
                        registers.systemError.set(`Register ${register.key} error: ${register.error}`);
                    }
                    console.info(register.key, register.error? register.error: register.value + (register.unit? " " + register.unit: ""));
                });
            });

            registers.systemMode.watch(async systemMode => {
                console.info("----------- " + systemMode.value.name + " -----------");
                if (systemMode.value.led) {
                    await registers.rgbLed.write(systemMode.value.led);
                }
                await systemMode.value.enter();
            });

            registers.systemError.watch(async systemError => {
                if (systemError.value) {
                    console.error("System error:", systemError.value);
                    await registers.systemMode.set(SystemMode.ERROR);
                }
            });


            console.info(JSON.stringify(registers, null, 2));

        }
    }
}