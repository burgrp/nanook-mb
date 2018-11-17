const createRegister = require("./register.js");
const asyncWait = require("./async-wait.js");

module.exports = async config => {

    let i2c = config.i2c;

    let obpAddress = config.obpAddress || 0x74;
    let rampDacAddress = config.rampDacAddress || 0x60;

    let registers = [];
    let tickers = [];

    Object.entries(config.lm75a).forEach(([key, registerConfig]) => {
        let register = createRegister(key + "Temp", registerConfig.name + " Temperature", undefined, "°C");
        tickers.push(async () => {
            try {
                let data = Buffer.from(await i2c.read(registerConfig.address, 2));
                await register.set((0.125 * data.readInt16BE()) / 32);
            } catch (e) {
                await register.failed(e.message || e);
            }
        });
        registers.push(register);
    });

    Object.entries(config.ias3a).forEach(([key, registerConfig]) => {

        function iasSensor(keySuffix, name, converter, unit) {
            let register = createRegister(key + keySuffix, registerConfig.name + " " + name, undefined, unit);

            let noiseBuffer = [];

            register.setRaw = async (raw) => {
                let value = raw === 0xFFFF ? undefined : converter(raw, registerConfig["transducer" + keySuffix], noiseBuffer);
                register.set(value);
            };

            return register;
        }

        function convertFlow(raw, transducerParams) {
            return transducerParams.mlPerRev * raw * 60 * 60 / 1000;
        }

        function convertPressure(raw, transducerParams, noiseBuffer) {
            let voltage = 5 * raw / 4096;
            if (voltage < 0.35) {
                throw `Pressure transducer voltage ${voltage} too low`;
            }
            voltage = Math.round(voltage * 20) / 20;

            let value = (voltage - 0.5) / 4 * (transducerParams.max - transducerParams.min) + transducerParams.min + (transducerParams.calibration || 0);
            noiseBuffer.push(value);

            while (noiseBuffer.length > 5) {
                noiseBuffer.shift();
            }

            let max;
            for (let v of noiseBuffer) {
                if (max === undefined || max < v) {
                    max = v;
                }
            }

            return max;
        }

        let iasSensors = [
            iasSensor("WaterFlow", "Water Flow", convertFlow, "l/h"),
            iasSensor("WaterPressure", "Water Pressure", convertPressure, "bar"),
            iasSensor("FrigoPressure", "Refrigerant Pressure", convertPressure, "bar")
        ];

        registers.push(...iasSensors);

        tickers.push(async () => {
            try {
                let data = Buffer.from(await i2c.read(registerConfig.address, 6));
                for (let c in iasSensors) {
                    try {
                        await iasSensors[c].setRaw(data.readUInt16LE(c * 2));
                    } catch (e) {
                        await iasSensors[c].failed(e.message || e);
                    }
                }
            } catch (e) {
                for (let c in iasSensors) {
                    await iasSensors[c].failed(e.message || e);
                }
            }
        });

    });

    let compressorRamp = createRegister("compressorRamp", "Compressor Ramp", undefined, "%");
    registers.push(compressorRamp);

    let compressorRelay = createRegister("compressorRelay", "Compressor Relay", undefined, undefined);
    registers.push(compressorRelay);

    let eevPosition = createRegister("eevPosition", "Expansion Valve", undefined, "steps");
    registers.push(eevPosition);

    let coldWaterPump = createRegister("coldWaterPump", "Cold Side Circulation Pump", undefined, undefined);
    registers.push(coldWaterPump);

    let hotWaterPump = createRegister("hotWaterPump", "Hot Side Circulation Pump", undefined, undefined);
    registers.push(hotWaterPump);

    let eevFault = createRegister("eevNFault", "EEV Fault", undefined, undefined);
    registers.push(eevFault);

    let i2cAlert = createRegister("i2cAlert", "I2C Alert", undefined, undefined);
    registers.push(i2cAlert);

    let pwrOk = createRegister("pwrOk", "Power OK", undefined, undefined);
    registers.push(pwrOk);

    let psLow = createRegister("psLow", "Low Pressure Switch", undefined, undefined);
    registers.push(psLow);

    let psHigh = createRegister("psHigh", "High Pressure Switch", undefined, undefined);
    registers.push(psHigh);

    tickers.push(async () => {
        try {

            //TODO why it fails sometimes?
            async function readAndCheckFF() {
                for (let a = 0; a < 10; a++) {
                    let data = await i2c.read(obpAddress, 1 + 1 + 4);
                    if (data.some(b => b !== 0xFF)) {
                        return data;
                    }
                    console.error("OBP reads as all 0xFF, retrying...");                    
                }
                throw "On board peripherals controller reads as all 0xFF"
            }

            let obpData = Buffer.from(await readAndCheckFF());
            
            let outputs = obpData.readUInt8(0);
            await compressorRelay.set((outputs & 1) != 0);
            await coldWaterPump.set((outputs & 2) != 0);
            await hotWaterPump.set((outputs & 4) != 0);

            let inputs = obpData.readUInt8(1);
            await eevFault.set((inputs & 1) != 0);
            await i2cAlert.set((inputs & 2) != 0);
            await pwrOk.set((inputs & 4) != 0);
            await psLow.set((inputs & 8) != 0);
            await psHigh.set((inputs & 16) != 0);

            await eevPosition.set(obpData.readInt32LE(2));

        } catch (e) {
            await compressorRelay.failed(e);
            await coldWaterPump.failed(e);
            await hotWaterPump.failed(e);
            await eevFault.failed(e);
            await i2cAlert.failed(e);
            await pwrOk.failed(e);
            await psLow.failed(e);
            await psHigh.failed(e);
            await eevPosition.failed(e);
        }

        try {
            let rampDacData = await i2c.read(rampDacAddress, 2);
            await compressorRamp.set(rampDacData[1] * 100 / 255);
        } catch (e) {
            await compressorRamp.failed(e);
        }
    });

    async function tick() {
        for (let ticker of tickers) {
            await ticker();
        }
    };

    function scheduleNextTick() {
        setTimeout(() => {
            tick().then(() => {
                scheduleNextTick();
            }).catch(e => {
                console.error(e);
                scheduleNextTick();
            });
        }, config.tickMs);
    }

    scheduleNextTick();

    return {
        registers,

        async setCompressorRelay(state) {
            console.log("Compressor Relay =>", state);
            await i2c.write(obpAddress, [3, 0, state ? 1 : 0]);
        },

        async setCompressorRamp(ramp) {
            console.log("Compressor Ramp =>", ramp);
            await i2c.write(rampDacAddress, [0, ramp * 255 / 100]);
        },

        async setColdWaterPump(state) {
            console.log("Cold Water Pump =>", state);
            await i2c.write(obpAddress, [3, 1, state ? 1 : 0]);
        },

        async setHotWaterPump(state) {
            console.log("Hot Water Pump =>", state);
            await i2c.write(obpAddress, [3, 2, state ? 1 : 0]);
        },

        async eevRun(fullSteps, fast) {
            console.info("EEV to run " + fullSteps + " steps" + (fast ? " fast" : ""));
            let buffer = Buffer.alloc(1 + 2 + 1);
            buffer.writeUInt8(2, 0);
            buffer.writeInt16LE(fullSteps, 1);
            buffer.writeUInt8(fast ? 1 : 0, 3);
            await i2c.write(obpAddress, [...buffer]);
        }
    }
}