const createRegister = require("./register.js");
const asyncWait = require("./async-wait.js");

module.exports = async config => {

    let registers;

    registers = [
        createRegister("controllerEnabled", "Controller", false),
        createRegister("compressorControl", "Compressor Control", false),
        ...config.peripherals.registers
    ];

    registers = registers.reduce((map, reg) => {
        map[reg.key] = reg;
        return map;
    }, {});

    let systemErrors = {};
    let systemErrorsListeners = [];

    function setSystemError(key, message) {
        if (systemErrors[key] !== message) {
            if (message === undefined) {
                delete systemErrors[key];
            } else {
                systemErrors[key] = message;
            }
            systemErrorsListeners.forEach(listener => {
                try {
                    listener(systemErrors);
                } catch (e) {
                    console.error("Error in system error listener", e);
                }
            });
        }
    }

    Object.values(registers).forEach(register => {
        register.watch(async register => {
            setSystemError(`register-${register.key}`, register.error ? `Register ${register.key} error: ${register.error.message || register.error}` : undefined);
            checkErrors();
        });
    });


    async function checkErrors() {
        if (registers.controllerEnabled.value && Object.keys(systemErrors).length) {
            await registers.controllerEnabled.set(false);
        }
    }

    registers.controllerEnabled.watch(async controllerEnabled => {
        await checkErrors();
        if (controllerEnabled.value) {
            console.info("CONTROLLER ENABLED");
        } else {
            console.info("CONTROLLER DISABLED");
            await registers.compressorControl.set(false);
            await registers.coldWaterPump.set(false);
            await registers.hotWaterPump.set(false);
            await registers.eevPosition.set(0);
        }
    });

    let rampLock = 0;
    let rampCancel = "Ramp cancelled";

    registers.compressorControl.watch(compressorControl => {
        async function ramp() {

            let myLock = ++rampLock;

            function checkLock() {
                if (rampLock !== myLock) {
                    throw rampCancel;
                }
            }

            let rampPeriodMs = config.rampPeriodMs || 100;
            let parallelRelaysMs = config.parallelRelaysMs || 1000;
            let rampUpStart = config.rampUpStart || 20;
            let rampDownStop = config.rampDownStop || 40;

            let actualRelay = registers.compressorRelay.value;
            if (actualRelay === undefined) {
                throw "Unknow state of compressor relay";
            }

            let actualRamp = registers.compressorRamp.value;
            if (actualRamp === undefined) {
                throw "Unknow state of compressor ramp";
            }

            if (compressorControl.value) {
                for (let r = Math.max(rampUpStart, actualRamp); r <= 100; r++) {
                    checkLock(); await config.peripherals.setCompressorRamp(r);
                    await asyncWait(rampPeriodMs);
                }
                checkLock(); await config.peripherals.setCompressorRelay(true);
                await asyncWait(parallelRelaysMs);
                checkLock(); await config.peripherals.setCompressorRamp(0);
            } else {
                if (actualRelay) {
                    checkLock(); await config.peripherals.setCompressorRamp(100);
                    actualRamp = 100;
                    await asyncWait(parallelRelaysMs);
                    checkLock(); await config.peripherals.setCompressorRelay(false);
                }
                for (let r = Math.min(100, actualRamp); r >= rampDownStop; r--) {
                    checkLock(); await config.peripherals.setCompressorRamp(r);
                    await asyncWait(rampPeriodMs);
                }
                checkLock(); await config.peripherals.setCompressorRamp(0);
            }

        }
        if (!registers.compressorControl.error) {
            ramp().catch(e => {
                if (e === rampCancel) {
                    console.info(rampCancel);
                } else {
                    registers.compressorControl.failed(e);
                }
            });
        }
    });

    return {

        registers,

        systemErrors,

        watchSystemErrors(listener) {
            systemErrorsListeners.push(listener);
        },

        async start() {
        },

        async setColdWaterPump(state) {
            await config.peripherals.setColdWaterPump(state);
        },

        async setHotWaterPump(state) {
            await config.peripherals.setHotWaterPump(state);
        },

        async eevRun(fullSteps, fast) {
            await config.peripherals.eevRun(fullSteps, fast);
        },
    }
}