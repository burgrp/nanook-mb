#include "nanook.h"

void app_main()
{
    LOGI("Initializing application...");

    registers_init();
    nvm_init();
    wifi_init();

    dump_registers();

    LOGI("Application initialized.");
}
