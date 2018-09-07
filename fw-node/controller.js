module.exports = async config => {

    

    return {
        
        async start() {            
            console.info("Starting controller...");

            let sensors = await config.peripherals.readSensors();
            console.info(JSON.stringify(sensors, null, 2));

        }
    }
}