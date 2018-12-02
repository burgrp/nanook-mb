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


    function systemErrorsUpdated() {
        systemErrorsListeners.forEach(listener => {
            try {
                listener(systemErrors);
            } catch (e) {
                console.error("Error in system error listener", e);
            }
        });
    }

    function clearSystemError(key) {
        delete systemErrors[key];
        systemErrorsUpdated();
    }


    function setSystemError(key, message) {
        if (systemErrors[key] !== message) {
            if (message === undefined) {
                delete systemErrors[key];
            } else {
                systemErrors[key] = message;
            }
            systemErrorsUpdated();
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

    async function startControllerLoop() {

        function controllerError(key, message) {
            throw { key, message };
        }

        function checkRegisterMin(register, min) {
            if (register.value < min) {
                controllerError(`${register.key}.min`, `${register.name} ${register.value}${register.unit || ""} lower than ${min}${register.unit || ""}`);
            }
        }

        function checkRegisterMax(register, max) {
            if (register.value > max) {
                controllerError(`${register.key}.max`, `${register.name} ${register.value}${register.unit || ""} higher than ${max}${register.unit || ""}`);
            }
        }

        await config.peripherals.setColdWaterPump(true);
        await config.peripherals.setHotWaterPump(true);
        await config.peripherals.eevRun(500, true);
        await asyncWait(10000);
        await config.peripherals.eevRun(-230, true);
        await asyncWait(2000);

        function periodicChecks() {
            checkRegisterMin(registers.coldWaterInTemp, 0);
            checkRegisterMin(registers.coldWaterOutTemp, -10);
            checkRegisterMin(registers.coldWaterFlow, 100);
            checkRegisterMin(registers.coldWaterPressure, 0.2);
            checkRegisterMin(registers.hotWaterFlow, 300);
            checkRegisterMin(registers.hotWaterPressure, 0.3);
            checkRegisterMax(registers.hotFrigoPressure, 23);
        }

        // one pass through periodic checks before compressor start
        periodicChecks();

        await registers.compressorControl.set(true);

        while (registers.controllerEnabled.value) {
            console.info("Controller check");
            periodicChecks();
            await asyncWait(1000);
        }
    }

    registers.controllerEnabled.watch(async controllerEnabled => {
        await checkErrors();
        if (registers.controllerEnabled.value) {
            console.info("Controller enabled");
            startControllerLoop().catch(e => {
                setSystemError(e.key || "controllerError", e.message || e);
            });
        } else {
            console.info("Controller disabled");
            await registers.compressorControl.set(false);
            await config.peripherals.setColdWaterPump(false);
            await config.peripherals.setHotWaterPump(false);
            await config.peripherals.eevRun(500, true);
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

            let rampTimeMs = config.rampTimeMs || 800;
            let rampMinPerc = 60;
            let rampStepMs = config.rampStepMs || 100;

            let rampStepPerc = (100 - rampMinPerc) / (rampTimeMs / rampStepMs);

            let actualRelay = registers.compressorRelay.value;
            if (actualRelay === undefined) {
                throw "Unknow state of compressor relay";
            }

            let actualRamp = registers.compressorRamp.value;
            if (actualRamp === undefined) {
                throw "Unknow state of compressor ramp";
            }

            if (compressorControl.value) {
                for (let r = rampMinPerc; r <= 100; r += rampStepPerc) {
                    checkLock(); await config.peripherals.setCompressorRamp(Math.max(r, actualRamp));
                    await asyncWait(rampStepMs);
                }
                checkLock(); await config.peripherals.setCompressorRelay(true);
                await asyncWait(config.parallelRelaysMsOn || 10000);
                checkLock(); await config.peripherals.setCompressorRamp(0);
            } else {
                if (actualRelay) {
                    checkLock(); await config.peripherals.setCompressorRamp(100);
                    actualRamp = 100;
                    await asyncWait(config.parallelRelaysMsOff || 1000);
                    checkLock(); await config.peripherals.setCompressorRelay(false);
                }
                for (let r = 100; r >= rampMinPerc; r -= rampStepPerc) {
                    checkLock(); await config.peripherals.setCompressorRamp(Math.min(r, actualRamp));
                    await asyncWait(rampStepMs);
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

        async clearSystemError(key) {
            clearSystemError(key);
        }
    }
}
