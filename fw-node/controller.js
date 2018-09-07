module.exports = async config => {

    let rgbLed = config.rgbLed;

    return {
        
        rgbLed,

        async start() {            
            console.info("Starting controller...");

            await config.rgbLed.set(0, 0, 0, 0, 0, 10, 4);

        }
    }
}