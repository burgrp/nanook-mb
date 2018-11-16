module.exports = async config => {

    let dashboard = {
        client: __dirname + "/dashboard-client",
        events: {
            registerChanged: {},
            systemErrorsChanged: {}
        },
        api: {
            dashboard: {
                async getRegisters() {
                    return config.controller.registers;
                },

                async getSystemErrors() {
                    return config.controller.systemErrors;
                },

                async setRegister(regName, value) {
                    await config.controller.registers[regName].set(value);
                },

                async setColdWaterPump(state) {
                    await config.controller.setColdWaterPump(state);
                },

                async setHotWaterPump(state) {
                    await config.controller.setHotWaterPump(state);
                },

                async eevRun(fullSteps, fast) {
                    await config.controller.eevRun(fullSteps, fast);
                },

                async clearSystemError(key) {
                    await config.controller.clearSystemError(key);
                }

            }
        }
    }

    config.controller.watchSystemErrors(systemErrors => {
        dashboard.events.systemErrorsChanged(systemErrors);
    });

    Object.values(config.controller.registers).forEach(register => {
        register.watch(() => {            
            dashboard.events.registerChanged(register);
        })
    });

    return dashboard;
}