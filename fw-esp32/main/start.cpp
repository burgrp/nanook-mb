#include "start.hpp"

extern "C"
{
    void app_main()
    {
        LOGI("Initializing application...");

        new NVM();
        new WiFi();
        new Sensors();

        //vTaskStartScheduler();

        LOGI("Application initialized.");
    }
}
