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
                if (register.error) {
                    registers.systemErrors.value[register.key] = register.error;
                } else {
                    delete registers.systemErrors.value[register.key];
                }
                await registers.systemErrors.set(Object.assign({}, registers.systemErrors.value));
            }
        });
    });

    registers.compressorControl.watch(reg => {
        async function ramp() {

            if (reg.value) {
                for (let r = 1; r <= 100; r++) {
                    await registers.compressorRamp.set(r);
                    await asyncWait(100);
                }
                registers.compressorRelay.set(true);
                await asyncWait(2000);
                await registers.compressorRamp.set(0);
            } else {
                await registers.compressorRamp.set(100);
                await asyncWait(2000);
                registers.compressorRelay.set(false);
                for (let r = 100; r >= 0; r--) {
                    await registers.compressorRamp.set(r);
                    await asyncWait(100);
                }
            }

        }
        ramp().catch(e => registers.compressorControl.failed(e));
    });

    return {

        registers,

        async start() {
        }
    }
}