const driver = require("@device.farm/usb-i2c-driver");

function asyncWait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {

    let device = await driver.open();

    let r0 = 0;
    while (true) {
        try {
            // set reg0 to 1
            let crc = 0x1234 ^ (r0 >> 16) ^  (r0 & 0xFFFF);
            let data = [0, r0 & 0xFF, (r0 >> 8) & 0xFF, (r0 >> 16) & 0xFF, (r0 >> 24) & 0xFF, crc & 0xFF, (crc >> 8) & 0xFF];
            //console.info(data);
            await device.write(0x75, data);
            //console.info("write done");
            await asyncWait(100);

            // data = await device.read(0x75, 7);
            // console.info(data);
        } catch (e) {
            console.error(e);
        }
        r0++;
        //break;
        await asyncWait(1000);
    }
}

start().catch(console.error);
