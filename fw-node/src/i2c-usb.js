module.exports = config => {
    return {
        open(address) {
            try {
                return require("@device.farm/usb-i2c-driver").open();
            } catch(e) {
                console.error("Error wile opening USB driver", e);
                throw e;
            }
        }
    }
}