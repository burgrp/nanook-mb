const createRegister = require("./register.js");

module.exports = async config => {

    let registers;

    async function asyncWait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function checkSystemError() {
        if (registers.systemMode.value === SystemMode.ERROR) {
            throw "Action aborted - system is in error state";
        }
    }


    async function setRelay(state) {
        checkSystemError();
        console.info("Switching relay", state ? "ON" : "OFF");
    }

    async function setRamp(ramp) {
        checkSystemError();
        console.info("Ramp", ramp);
    }

    async function sweepRamp(from, to) {

        let r = from;
        let m = from < to ? 1 : -1;

        while (r * m <= to * m) {
            await setRamp(r);
            r += m;
            await asyncWait(50);
        }

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
                await sweepRamp(0, 100);
                await setRelay(true);
                await asyncWait(1000);
                await setRamp(0);
                checkSystemError();
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
                await setRamp(100);
                await setRelay(false);
                await asyncWait(1000);
                await sweepRamp(100, 50);
                checkSystemError();
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

            for (let key in registers) {
                let register = registers[key];

                register.exceptionHandler = async e => {
                    try {
                        if (!registers.systemError.value) {
                            await registers.systemError.set(`Register ${register.key} listener error: ${e.message || e}`);
                        }
                    } catch(e2) {
                        console.error("Critical error: could not set system error", e, "because of", e2);
                    }
                }

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
            };

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

        }
    }
}