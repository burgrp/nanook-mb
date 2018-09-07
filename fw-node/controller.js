module.exports = async config => {

    const SystemMode = {
        OS_BOOTED: {
            name: "Operating system booted"
        },
        STAND_BY: {
            name: "Stand by",            
            led: [50, 0, 50, 100, 0, 50, 255]
        },
        RAMP_UP: {
            name: "Ramp up",
            led: [5, 0, 5, 0, 100, 255, 0]
        },
        WORKING: {
            name: "Working",
            led: [50, 50, 50, 0, 100, 255, 0]
        },
        RAMP_DOWN: {
            name: "Ramp down",
            led: [5, 0, 5, 0, 0, 50, 255]
        },
        SHUT_DOWN: {
            name: "Shut down",
            led: [10, 0, 10, 0, 255, 0, 0]
        },
        OFF: {
            name: "Off",            
            led: [0, 0, 0, 0, 255, 0, 0]
        }
    }

    let model = {
        systemMode: SystemMode.OS_BOOTED,
        sensors: {}
    };

    let ledMode;

    async function asyncWait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function closeE2V() {
        console.info("Closing E2V...")
        await asyncWait(10000);
        console.info("E2V closed");
    }

    function modeIs(mode) {
        return model.systemMode === mode;
    }

    function switchTo(mode) {
        console.info("Switching to " + mode.name);
        model.systemMode = mode;
    }

    return {

        model,

        async start() {
            console.info("Starting controller...");

            setInterval(async () => {
                try {

                    console.info("--------------------------------------------------");
                    console.info("SYSTEM MODE: " + model.systemMode.name);

                    if (ledMode != model.systemMode) {
                        try {
                            await config.peripherals.setLed(...(model.systemMode.led || [0, 0, 0, 0, 0, 0, 255]));
                        } catch(e) {
                            console.error(e);
                        }
                    }

                    if (modeIs(SystemMode.OFF)) {
                        process.exit(1);
                    }

                    await config.peripherals.readSensors(model.sensors);

                    Object.values(model.sensors).forEach(sensor => {
                        console.info(sensor.key + ":", " ".repeat(Math.max(22 - sensor.key.length, 0)), sensor.error || (sensor.value + sensor.unit));
                    });

                    let sensorErrors = Object.values(model.sensors).filter(s => s.error).map(s => s.name + " error: " + s.error);
                    if (sensorErrors.length) {
                        //throw sensorErrors;
                    }

                    if (modeIs(SystemMode.OS_BOOTED)) {
                        switchTo(SystemMode.STAND_BY);
                    }


                } catch (errors) {

                    if (!(errors instanceof Array)) {
                        errors = [errors];
                    }

                    errors.forEach(error => {
                        console.error(error);
                    });

                    if (!modeIs(SystemMode.SHUT_DOWN) && !modeIs(SystemMode.OFF)) {
                        switchTo(SystemMode.SHUT_DOWN);
                        try {
                            await closeE2V();
                        } catch (e2) {
                            console.error("Error when closing E2V", e2);
                        }
                        switchTo(SystemMode.OFF);

                    }

                }

            }, config.tickMs || 1000);

        }
    }
}