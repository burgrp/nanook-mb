#include "start.hpp"

extern "C"
{
    void app_main()
    {
        LOGI("Initializing application...");

        new NVM();
        new WiFi();
        Sensors* sensors = new Sensors();
        new DfRegisters(sensors);

        //vTaskStartScheduler();

        LOGI("Application initialized.");
    }
}
