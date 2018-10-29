const Rpc = require("mongoose-os-rpc").Rpc;
const pro = require("util").promisify;
const CriticalSection = require("promise-critical-section");
const section = new CriticalSection();

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
                async read(address, length) {
                    try {
                        await section.enter();
                        let result = await call("I2C.Read", { addr: address, len: length });
                        return [...Buffer.from(result.data_hex, "hex")];
                    } finally {
                        await section.leave();
                    }
                },

                async write(address, data) {
                    try {
                        await section.enter();
                        await call("I2C.Write", { addr: address, data_hex: Buffer.from(data).toString("hex") });
                    } finally {
                        await section.leave();
                    }
                }
            };
        }
    }
}