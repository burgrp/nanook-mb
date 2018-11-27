#ifndef __NANOOK_H__
#define __NANOOK_H__

#include <string.h>

#include "esp_system.h"
#include "esp_wifi.h"
#include "esp_event_loop.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "lwip/err.h"
#include "lwip/sys.h"

#define NANOOK_TAG "NANOOK"
#define LOGE(format, ... ) ESP_LOGE(NANOOK_TAG, format, ##__VA_ARGS__)
#define LOGW(format, ... ) ESP_LOGW(NANOOK_TAG, format, ##__VA_ARGS__)
#define LOGI(format, ... ) ESP_LOGI(NANOOK_TAG, format, ##__VA_ARGS__)
#define LOGD(format, ... ) ESP_LOGD(NANOOK_TAG, format, ##__VA_ARGS__)
#define LOGV(format, ... ) ESP_LOGV(NANOOK_TAG, format, ##__VA_ARGS__)

typedef struct {
  int coldWaterInTemp;
  int coldWaterOutTemp;
  int coldFrigoInTemp;
  int coldFrigoOutTemp;
  int hotFrigoInTemp;
  int hotFrigoOutTemp;
  int hotWaterInTemp;
  int hotWaterOutTemp;
  int coldWaterFlow;
  int coldWaterPressure;
  int coldFrigoPressure;
  int hotWaterFlow;
  int hotWaterPressure;
  int hotFrigoPressure;
  int compressorRamp;
  int compressorRelay;
  int eevPosition;
  int coldWaterPump;
  int hotWaterPump;
  int eevNFault;
  int i2cAlert;
  int pwrOk;
  int psLow;
  int psHigh;
} NanookRegisters;

extern NanookRegisters registers;
extern int* registersByIndex;
extern char* registerNames[];
extern int registersCount;

#define REG_VALUE_UNKNOWN INT_MAX

void nvm_init();
void wifi_init();
void registers_init();
void dump_registers();

#endif /* __NANOOK_H__ */
