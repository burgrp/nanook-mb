const driver = require("@device.farm/usb-i2c-driver");

function asyncWait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {

    let device = await driver.open();

    while (true) {
        try {
            await device.write(0x75, [0, 1, 0xFF]);
            let data = await device.read(0x75, 5);
            console.info(data);
        } catch(e) {
            console.error(e);
        }
        break;
        await asyncWait(1000);        
    }
}

start().catch(console.error);