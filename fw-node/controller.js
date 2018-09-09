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
        }
    }

    let model = {
        systemMode: SystemMode.OS_BOOTED,
        sensors: {},
        shouldWork: true,
        ramp: 0,
        relay: false
    };

    async function asyncWait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function modeIs(mode) {
        return model.systemMode === mode;
    }

    async function switchTo(mode) {
        console.info("Switching to " + mode.name);
        model.systemMode = mode;
        try {
            await config.peripherals.setLed(...(model.systemMode.led || [1, 1, 1, 1, 255, 255, 255]));
        } catch(e) {
            console.error("Error setting led", e);
        }
    }

    return {

        model,

        async start() {
            console.info("Starting controller...");

            async function tick() {
                try {                    

                    console.info("--------------------------------------------------");
                    console.info("SYSTEM MODE: " + model.systemMode.name);

                    await config.peripherals.getSensors(model.sensors);

                    function printValue(k, v) {
                        console.info(k + ":", " ".repeat(Math.max(22 - k.length, 0)), v);
                    }

                    Object.values(model.sensors).forEach(sensor => {
                        printValue(sensor.key, sensor.error || (sensor.value + sensor.unit));
                    });
                    Object.entries(model).filter(([k, v]) => !(v instanceof Object)).forEach(([k, v]) => {
                        printValue(k, v);
                    });

                    let sensorErrors = Object.values(model.sensors).filter(s => s.error).map(s => s.name + " error: " + s.error);
                    if (sensorErrors.length) {
                        throw sensorErrors;
                    }

                    if (modeIs(SystemMode.OS_BOOTED)) {
                        await switchTo(SystemMode.STAND_BY);
                    }

                    if (modeIs(SystemMode.STAND_BY) && model.shouldWork) {
                        await switchTo(SystemMode.RAMP_UP);
                    }

                    if (modeIs(SystemMode.RAMP_UP)) {
                        if (model.ramp === 100) {
                            model.ramp = 0;
                            switchTo(SystemMode.WORKING);
                            model.shouldWork = false;
                        } else {
                            model.ramp += config.tickMs / config.rampSec / 10;
                            if (model.ramp >= 100) {
                                model.ramp = 100;
                                model.relay = true;
                            }
                        }
                    }

                    if (modeIs(SystemMode.RAMP_DOWN)) {
                        if (model.ramp === 0) {                           
                            switchTo(SystemMode.STAND_BY);
                        } else {
                            model.relay = false;
                            model.ramp -= config.tickMs / config.rampSec / 10;
                            if (model.ramp <= 0) {
                                model.ramp = 0;
                            }
                        }
                    }

                    if (modeIs(SystemMode.WORKING) && !model.shouldWork) {
                        await switchTo(SystemMode.RAMP_DOWN);
                        model.ramp = 100;
                    }

                    await config.peripherals.setActors({
                        relay: model.relay,
                        ramp: model.ramp,
                        coldPump: model.relay || model.ramp > 0,
                        hotPump: model.relay || model.ramp > 0
                    });

                } catch (errors) {

                    if (!(errors instanceof Array)) {
                        errors = [errors];
                    }

                    errors.forEach(error => {
                        console.error(error);
                    });

                    if (!modeIs(SystemMode.SHUT_DOWN)) {
                        try {
                            await switchTo(SystemMode.SHUT_DOWN);    
                            await config.peripherals.e2vFastClose();
                        } catch(e) {
                            console.error(e);
                        }
                        process.exit(1);
                    }

                }

            };

            function scheduleNextTick() {
                setTimeout(() => {
                    tick().then(() => {
                        scheduleNextTick();
                    }).catch(e => {
                        console.error(e);
                        scheduleNextTick();
                    });
                }, config.tickMs);
            }

            scheduleNextTick();

        }
    }
}