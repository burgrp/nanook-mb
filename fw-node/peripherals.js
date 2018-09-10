const createRegister = require("./register.js");

module.exports = async config => {

    let i2c = config.i2c;

    let obpAddress = config.obpAddress || 0x73;

    let registers = {};
    let tickers = [];

    Object.entries(config.lm75a).forEach(([key, registerConfig]) => {
        let register = createRegister(key + "Temp", registerConfig.name + " Temperature", undefined, "°C");
        tickers.push(async () => {
            try {
                let data = Buffer.from(await i2c.read(registerConfig.address, 2));
                await register.set((0.125 * data.readUInt16BE()) / 32);
            } catch (e) {
                await register.failed(e.message || e);
            }
        });
        registers[register.key] = register;
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
            if (voltage < 0.4) {
                throw `Pressure transducer voltage ${voltage} too low`;
            }
            voltage = Math.round(voltage * 20) / 20;

            let value = (voltage - 0.5) / 4 * (transducerParams.max - transducerParams.min) + transducerParams.min;
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

        iasSensors.forEach(s => registers[s.key] = s);

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

    function createActorRegister(key, name, value, setHandler) {
        let register = createRegister(key, name, value);
        register.watch(async () => {
            console.info("->", key, value);
            await setHandler(register.value);
        });
        registers[key] = register;
    }

    createActorRegister("rgbLed", "RGB LED", {
        rampUpTime: 0,
        onTime: 0,
        rampDownTime: 0,
        offTime: 0,
        r: 0,
        g: 0,
        b: 255
    }, async value => {
        await i2c.write(obpAddress, [1, value.rampUpTime, value.onTime, value.rampDownTime, value.offTime, value.r, value.g, value.b]);
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
        async setLed(rampUpTime, onTime, rampDownTime, offTime, r, g, b) {
            await i2c.write(obpAddress, [1, rampUpTime, onTime, rampDownTime, offTime, r, g, b]);
        },

        registers
    }
}