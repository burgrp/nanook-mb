#include <cstring>
#include <string>
#include <list>

#include "sdkconfig.h"
#include "freertos/FreeRTOS.h"
#include "freertos/timers.h"
#include "freertos/projdefs.h"

#include "esp_system.h"
#include "esp_wifi.h"
#include "esp_event_loop.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "lwip/err.h"
#include "lwip/sys.h"
#include "mqtt_client.h"

#define NANOOK_TAG "NANOOK"
#define LOGE(format, ...) ESP_LOGE(NANOOK_TAG, format, ##__VA_ARGS__)
#define LOGW(format, ...) ESP_LOGW(NANOOK_TAG, format, ##__VA_ARGS__)
#define LOGI(format, ...) ESP_LOGI(NANOOK_TAG, format, ##__VA_ARGS__)
#define LOGD(format, ...) ESP_LOGD(NANOOK_TAG, format, ##__VA_ARGS__)
#define LOGV(format, ...) ESP_LOGV(NANOOK_TAG, format, ##__VA_ARGS__)

#include "NVM.hpp"
#include "WiFi.hpp"
#include "Ticker.hpp"
#include "Sensor.hpp"
#include "SensorFloat.hpp"
#include "SensorLM75A.hpp"
#include "AnalogSensorsBoard.hpp"
#include "SensorInt.hpp"
#include "SensorMCP4706.hpp"
#include "SensorEevPosition.hpp"
#include "SensorBoolean.hpp"
#include "OnboardPeripherals.hpp"
#include "Sensors.hpp"
#include "DfRegisters.hpp"
