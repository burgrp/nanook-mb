module.exports = config => {
    
    let i2c;

    async function withInterface(action) {
        
        if (!i2c) {
            i2c = require("@device.farm/usb-i2c-driver").open();            
        }

        try {
            return await action(i2c);
        } catch (e) {
            if (e.message === "LIBUSB_ERROR_NO_DEVICE") {
                i2c = usbI2c.open();            
                return await action(i2c);
            } else {
                throw e;
            }
        }
    }
    
    return {
        async read(address, length) {
            return withInterface(async i => await i.read(address, length));
        },

        async write(address, data) {
            return withInterface(async i => await i.write(address, data));
        }
    };
}