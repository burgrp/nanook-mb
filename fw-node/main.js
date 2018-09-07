// const i2c = require("@device.farm/usb-i2c-driver").open();

// const address = 0x73;

// //let x = 0;

// async function test() {
//     try {
//         await i2c.write(address, [1, 0, 1, 0, 1, 255, 0, 0]);
//         //x += 2;
//         // let data = await i2c.read(address, 6);
//         // console.info(data);
//     } catch (e) {
//         console.error(e);
//     }
//     //setTimeout(test, 500);
// }

// test();


require("@device.farm/appglue")({require}).main(async app => {
    await app.controller.start();
});