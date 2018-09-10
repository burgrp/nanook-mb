const deepEqual = require("fast-deep-equal");

module.exports = (key, name, value, unit) => {

    let listeners = [];

    return {

        key,
        name,
        value,
        unit,

        async watch(listener) {
            listeners.push(listener);
            await listener(this);
        },

        async set(value, error) {
            if (!deepEqual(this.value, value) || !deepEqual(this.error, error)) {
                this.value = value;
                this.error = error;
                for (let listener of listeners) {
                    await listener(this);
                }
            }
        },

        async failed(error) {
            this.set(undefined, error);
        }
    }
}