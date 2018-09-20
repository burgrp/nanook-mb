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

                async setRegister(regName, value) {
                    config.controller.registers[regName].set(value);
                },

                async getSystemErrors() {
                    return config.controller.systemErrors;
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