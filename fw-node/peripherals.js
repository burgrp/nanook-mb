module.exports = async config => {

    let i2c = config.i2c;

    let address = config.address || 0x73;

    return {
        async readSensors() {
            // async set(rampUpTime, onTime, rampDownTime, offTime, r, g, b) {
            //     await i2c.write(address, [1, rampUpTime, onTime, rampDownTime, offTime, r, g, b]);
            // }

            let result = {};

            async function read(sensorsConfig, sensorsProvider) {
                for (let key in sensorsConfig || {}) {

                    let sensors = await sensorsProvider(key, sensorsConfig[key]);                    

                    for (let sensor of sensors) {
                        result[sensor.key] = sensor;
                    }
                }
            }

            await read(config.lm75a, async (key, config) => {
                let sensor = {
                    key: key + "Temp",
                    name: config.name + " Temperature"
                };
                try {
                    let data = Buffer.from(await i2c.read(config.address, 2));
                    sensor.value = (0.125 * data.readUInt16BE()) / 32;
                    sensor.unit = "°C";
                } catch (e) {
                    sensor.error = e.message || e;
                }
                return [sensor];
            });

            await read(config.ias3a, async (key, config) => {

                function iasSensors(rawWaterFlow, rawWaterPressure, rawRefrigerantPressure, error) {

                    function iasSensor(keySuffix, name, value, converter, unit, error) {
                        
                        if (!error) {
                            try {
                                value = converter(value, config["transducer" + keySuffix]);
                            } catch(e) {
                                value = undefined;
                                error = e.message || e;
                            }
                        }

                        return {
                            key: key + keySuffix,
                            name: config.name + " " + name,
                            value,
                            unit,
                            error
                        };
                    }

                    function convertFlow(raw, transducerParams) {
                        return raw;
                    }

                    function convertPressure(raw, transducerParams) {
                        let voltage = 5 * raw / 4096;
                        if (voltage < 0.4) {
                            throw `Pressure transducer voltage ${voltage} too low`;
                        }                        
                        return (voltage - 0.5) / 4.5 * (transducerParams.max - transducerParams.min) + transducerParams.min;
                    }

                    return [
                        iasSensor("WaterFlow", "Water Flow", rawWaterFlow, convertFlow, "l/min", error),
                        iasSensor("WaterPressure", "Water Pressure", rawWaterPressure, convertPressure, "bar", error),
                        iasSensor("RefrigerantPressure", "Refrigerant Pressure", rawRefrigerantPressure, convertPressure, "bar", error),
                    ];
                };

                try {
                    let data = Buffer.from(await i2c.read(config.address, 6));
                    return iasSensors(data.readUInt16LE(0), data.readUInt16LE(2), data.readUInt16LE(4));
                } catch (e) {
                    return iasSensors(undefined, undefined, undefined, e.message || e);
                }

            });

            return result;
        }
    }
}