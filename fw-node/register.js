const deepEqual = require("fast-deep-equal");

module.exports = (key, name, value, unit) => {

    let listeners = [];

    async function checkedListener(listener, register) {
        try {
            await listener(register);
        } catch (e) {
            console.error(e);
            if (register.exceptionHandler) {
                await register.exceptionHandler(e, register);
            } 
        }
    }

    return {

        key,
        name,
        value,
        unit,
      
        async watch(listener) {
            listeners.push(listener);
            await checkedListener(listener, this);
        },

        async set(value, error) {
            if (!deepEqual(this.value, value) || !deepEqual(this.error, error)) {
                this.value = value;
                this.error = error;
                for (let listener of listeners) {
                    await checkedListener(listener, this);
                }
            }
        },

        async failed(error) {
            this.set(undefined, error);
        }
    }
}