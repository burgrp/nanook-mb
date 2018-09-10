module.exports = async config => {

    // const SystemMode = {
    //     OS_BOOTED: {
    //         name: "Operating system booted"
    //     },
    //     STAND_BY: {
    //         name: "Stand by",            
    //         led: [50, 0, 50, 100, 0, 50, 255]
    //     },
    //     RAMP_UP: {
    //         name: "Ramp up",
    //         led: [5, 0, 5, 0, 100, 255, 0]
    //     },
    //     WORKING: {
    //         name: "Working",
    //         led: [50, 50, 50, 0, 100, 255, 0]
    //     },
    //     RAMP_DOWN: {
    //         name: "Ramp down",
    //         led: [5, 0, 5, 0, 0, 50, 255]
    //     },
    //     SHUT_DOWN: {
    //         name: "Shut down",
    //         led: [10, 0, 10, 0, 255, 0, 0]
    //     }
    // }

    let registers = Object.assign({}, config.peripherals.registers);

    async function asyncWait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return {

        registers,

        async start() {
            console.info("Starting controller...");

            Object.values(registers).forEach(register => {
                register.watch(() => {
                    console.info(register.key, register.error || register.value);
                });
            });

            // async function tick() {


            // };

            // function scheduleNextTick() {
            //     setTimeout(() => {
            //         tick().then(() => {
            //             scheduleNextTick();
            //         }).catch(e => {
            //             console.error(e);
            //             scheduleNextTick();
            //         });
            //     }, config.tickMs);
            // }

            // //scheduleNextTick();

            console.info(JSON.stringify(registers, null, 2));

        }
    }
}