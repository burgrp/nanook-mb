const createRegister = require("./register.js");
const asyncWait = require("./async-wait.js");

module.exports = async config => {

    let registers;

    registers = [
        createRegister("systemErrors", "System Errors", {
            errorAbc: "No compressor connected",
            errorDac: "No DAC connected"
        }),
        createRegister("compressorControl", "Compressor Control", false),
        ...config.peripherals.registers
    ];

    registers = registers.reduce((map, reg) => {
        map[reg.key] = reg;
        return map;
    }, {});

    Object.values(registers).forEach(register => {
        register.watch(async register => {
            if (register !== registers.systemErrors) {
                let snaphot = registers.systemErrors.snapshot();
                if (register.error) {
                    registers.systemErrors.value[register.key] = register.error;
                } else {
                    delete registers.systemErrors.value[register.key];
                }
                await registers.systemErrors.check(snaphot);
            }
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
            let parallelRelaysMs = config.parallelRelaysMs || 2000;
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

        async start() {
        }
    }
}