const createRegister = require("./register.js");

module.exports = async config => {

    let registers;

    async function asyncWait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const SystemMode = {
        STAND_BY: {
            name: "Stand by",
            led: [50, 0, 50, 50, 0, 50, 255],
            async check() {
                if (registers.shouldWork.value) {
                    await registers.systemMode.set(SystemMode.RAMP_UP);
                }
            }
        },
        RAMP_UP: {
            name: "Ramp up",
            led: [5, 0, 5, 0, 100, 255, 0],
            async enter() {
                for (let c = 0; c <= 100; c++) {
                    await asyncWait(100);
                    console.info("Ramp up", c);
                }
                await registers.systemMode.set(SystemMode.WORKING);
            }
        },
        WORKING: {
            name: "Working",
            led: [50, 50, 50, 0, 100, 255, 0],
            async check() {
                if (!registers.shouldWork.value) {
                    await registers.systemMode.set(SystemMode.RAMP_DOWN);
                }
            }
        },
        RAMP_DOWN: {
            name: "Ramp down",
            led: [5, 0, 5, 0, 0, 50, 255],
            async enter() {
                for (let c = 100; c >= 50; c--) {
                    await asyncWait(100);
                    console.info("Ramp down", c);
                }
                await registers.systemMode.set(SystemMode.STAND_BY);
            }
        },
        ERROR: {
            name: "Shut down",
            led: [10, 0, 10, 0, 255, 0, 0]
        }
    }

    Object.entries(SystemMode).forEach(([k, v]) => v.key = k);

    registers = [
        createRegister("systemMode", "System Mode", SystemMode.STAND_BY),
        createRegister("systemError", "System Error", undefined),
        createRegister("shouldWork", "Should Work", false),
        ...config.peripherals.registers
    ];

    registers = registers.reduce((map, reg) => {
        map[reg.key] = reg;
        return map;
    }, {});

    return {

        registers,

        async start() {
            console.info("Starting controller...");

            Object.values(registers).forEach(register => {
                register.watch(async () => {
                    if (register.error) {
                        await registers.systemError.set(`Register ${register.key} error: ${register.error}`);
                    }
                    console.info(register.key,
                        register.error ?
                            register.error :
                            register.value instanceof Object ?
                                (register.value && register.value.key) || JSON.stringify(register.value) :
                                register.value + (
                                    register.unit ? " " + register.unit : ""
                                )
                    );

                    await registers.shouldWork.set(registers.hotFrigoPressure.value < 10);

                    if (registers.systemMode.value.check) {
                        await registers.systemMode.value.check();
                    }

                });
            });

            registers.systemMode.watch(async systemMode => {
                console.info("----------- " + systemMode.value.name + " -----------");
                if (systemMode.value.led) {
                    await registers.rgbLed.write(systemMode.value.led);
                }

                if (systemMode.value.enter) {
                    await systemMode.value.enter();
                }
            });

            registers.systemError.watch(async systemError => {
                if (systemError.value) {
                    console.error("System error:", systemError.value);
                    await registers.systemMode.set(SystemMode.ERROR);
                }
            });


            //console.info(JSON.stringify(registers, null, 2));

        }
    }
}