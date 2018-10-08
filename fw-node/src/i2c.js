module.exports = config => {

    let i2c;

    function reopen() {
        i2c = require("@device.farm/usb-i2c-driver").open();
    }

    async function withInterface(action) {

        if (!i2c) {
            reopen();
        }

        let attempt = 1;
        while(true) {
            try {
                return await action(i2c);
            } catch (e) {
                if (attempt > 5) {
                    throw e;
                }
                attempt++;
                reopen();
                console.info("I2C operation failed, retry " + attempt);
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