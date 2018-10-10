const Rpc = require("mongoose-os-rpc").Rpc;
const pro = require("util").promisify;

module.exports = config => {
    return {
        open(address) {

            let rpc = new Rpc({ address });

            function call(name, params) {
                return new Promise((resolve, reject) => {
                    rpc.call(name, params, "", (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });

                });
            } 

            return {
                async read(address, length) 
                {
                    let result = await call("I2C.Read", {addr: address, len: length});
                    //console.info(result);
                    return [...Buffer.from(result.data_hex, "hex")];
                },

                async write(address, data) {
                    await call("I2C.Write", {addr: address, data_hex: Buffer.from(data).toString("hex")});
                }
            };
        }
    }
}