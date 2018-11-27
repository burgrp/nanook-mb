#include <cstring>

#include "esp_system.h"
#include "esp_wifi.h"
#include "esp_event_loop.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "lwip/err.h"
#include "lwip/sys.h"

#define NANOOK_TAG "NANOOK"
#define LOGE(format, ...) ESP_LOGE(NANOOK_TAG, format, ##__VA_ARGS__)
#define LOGW(format, ...) ESP_LOGW(NANOOK_TAG, format, ##__VA_ARGS__)
#define LOGI(format, ...) ESP_LOGI(NANOOK_TAG, format, ##__VA_ARGS__)
#define LOGD(format, ...) ESP_LOGD(NANOOK_TAG, format, ##__VA_ARGS__)
#define LOGV(format, ...) ESP_LOGV(NANOOK_TAG, format, ##__VA_ARGS__)

#include "nvm.hpp"
#include "wifi.hpp"
#include "Sensors.hpp"

extern "C"
{
    void app_main()
    {
        LOGI("Initializing application...");

        new NVM();
        new WiFi();
        new Sensors();
        
        LOGI("Application initialized.");
    }
}
