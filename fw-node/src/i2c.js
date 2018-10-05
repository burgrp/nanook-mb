module.exports = config => {

    let i2c;

    function reopen() {
        i2c = require("@device.farm/usb-i2c-driver").open();
    }

    async function withInterface(action) {

        if (!i2c) {
            reopen();
        }

        try {
            return await action(i2c);
        } catch (e) {
            if (e.message === "LIBUSB_ERROR_NO_DEVICE") {
                reopen();
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