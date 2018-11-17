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

    function clearSystemError(key) 
    {
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

        let startTime = new Date().getTime();

        function checkRegisterMin(register, min, delay = 0) {
            if (!(register.value >= min) && new Date().getTime() > startTime + delay * 1000) {
                setSystemError(`${register.key}.min`, `${register.name} ${register.value}${register.unit || ""} is less than ${min}${register.unit || ""}`)
            }
        }

        while (registers.controllerEnabled.value) {
            console.info("Controller check");

            checkRegisterMin(registers.coldWaterInTemp, 0, 30);
            checkRegisterMin(registers.coldWaterOutTemp, -10, 30);
            //checkRegisterMin(registers.coldWaterFlow, 1, 5);
            //checkRegisterMin(registers.coldWaterPressure, 0.5);

            checkRegisterMin(registers.hotWaterFlow, 1500, 5);
            checkRegisterMin(registers.hotWaterPressure, 0.5);

            if (!Object.values(systemErrors).length) {

                if (!registers.hotWaterPump.value) {
                    await config.peripherals.setHotWaterPump(true);
                }

            }

            await asyncWait(1000);
        }
    }

    registers.controllerEnabled.watch(async controllerEnabled => {
        await checkErrors();
        if (registers.controllerEnabled.value) {
            console.info("Controller enabled");
            setSystemError("controllerError");
            startControllerLoop().catch(e => {
                setSystemError("controllerError", e.message || e);
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

            let parallelRelaysMs = config.parallelRelaysMs || 1000;

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
                await asyncWait(parallelRelaysMs);
                checkLock(); await config.peripherals.setCompressorRamp(0);
            } else {
                if (actualRelay) {
                    checkLock(); await config.peripherals.setCompressorRamp(100);
                    actualRamp = 100;
                    await asyncWait(parallelRelaysMs);
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