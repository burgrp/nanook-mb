const createRegister = require("./register.js");
const asyncWait = require("./async-wait.js");

module.exports = async config => {

    let registers;

    registers = [
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
                } catch(e) {
                    console.error("Error in system error listener", e);
                }
            });
        }
    }

    Object.values(registers).forEach(register => {
        register.watch(async register => {
            setSystemError(`register-${register.key}`, register.error? `Register ${register.key} error: ${register.error.message || register.error}`: undefined);
        });
    });

    let rampLock = 0;
    let rampCancel = "Ramp cancelled";

    registers.compressorControl.watch(reg => {
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

            if (reg.value) {
                for (let r = Math.max(rampUpStart, registers.compressorRamp.value); r <= 100; r++) {
                    checkLock();
                    await registers.compressorRamp.set(r);
                    await asyncWait(rampPeriodMs);
                }
                checkLock();
                await registers.compressorRelay.set(true);
                await asyncWait(parallelRelaysMs);
                checkLock();
                await registers.compressorRamp.set(0);
            } else {
                checkLock();
                if (registers.compressorRelay.value) {
                    await registers.compressorRamp.set(100);
                    await asyncWait(parallelRelaysMs);
                    checkLock();
                    await registers.compressorRelay.set(false);
                }
                for (let r = Math.min(100, registers.compressorRamp.value); r >= rampDownStop; r--) {
                    checkLock();
                    await registers.compressorRamp.set(r);
                    await asyncWait(rampPeriodMs);
                }
                checkLock();
                await registers.compressorRamp.set(0);
            }

        }
        ramp().catch(e => {
            if (e === rampCancel) {
                console.info(rampCancel);
            } else {
                registers.compressorControl.failed(e);
            }
        });
    });

    return {

        registers,

        systemErrors,

        watchSystemErrors(listener) {
            systemErrorsListeners.push(listener);
        },

        async start() {
        }
    }
}