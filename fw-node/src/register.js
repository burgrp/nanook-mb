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

        watch(listener) {
            listeners.push(listener);
        },

        async set(value, error) {
            if (this.value !== value || this.error !== error) {
                this.value = value;
                this.error = error ? error.message || error : undefined;
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