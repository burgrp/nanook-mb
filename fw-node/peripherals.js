module.exports = async config => {

    let i2c = config.i2c;

    let address = config.address || 0x73;

    return {
        rgbLed: {
            async set(rampUpTime, onTime, rampDownTime, offTime, r, g, b) {
                await i2c.write(address, [1, rampUpTime, onTime, rampDownTime, offTime, r, g, b]);
            }
        }
    }
}