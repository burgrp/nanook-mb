const asyncWait = require("./async-wait.js");

module.exports = config => {



    if (!config.bus) {
        throw ("I2C bus not defined");
    }
    console.info("I2C bus:", config.bus);

    let transportName = config.bus.replace(/:.*/, "");

    let transport = config.transport[transportName];
    if (!transport) {
        throw `Unknown transport "${transportName}"`;
    }

    let busName = config.bus.substring(transportName.length + 1);

    let i2c;

    async function withInterface(action) {

        if (!i2c) {
            i2c = await transport.open(busName);
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
                i2c = await transport.open(busName);
                console.info("I2C operation failed, retry " + attempt);
                await asyncWait(100);
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