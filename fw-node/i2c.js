const usbI2c = require("@device.farm/usb-i2c-driver");

module.exports = config => {
    let i2c = usbI2c.open();
    return i2c;
}