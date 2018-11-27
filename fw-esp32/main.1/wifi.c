#include "nanook.h"

static esp_err_t event_handler(void *ctx, system_event_t *event)
{
    switch (event->event_id)
    {
    case SYSTEM_EVENT_STA_START:
    case SYSTEM_EVENT_STA_DISCONNECTED:
    {
        esp_wifi_connect();
        break;
    }
    default:
        break;
    }
    return ESP_OK;
}

void wifi_init()
{
    tcpip_adapter_init();
    ESP_ERROR_CHECK(esp_event_loop_init(event_handler, NULL));

    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));
    wifi_config_t wifi_config = {
        .sta = {
            .ssid = CONFIG_NANOOK_WIFI_SSID,
            .password = CONFIG_NANOOK_WIFI_PASSWORD
        }
    };

    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_wifi_set_config(ESP_IF_WIFI_STA, &wifi_config));
    ESP_ERROR_CHECK(esp_wifi_start());
}

// #include "driver/i2c.h"


// void wifi_init()
// {

//     wifi_init_sta();

    // int i2c_slave_port = 1;
    // i2c_config_t conf_slave;
    // conf_slave.sda_io_num = 26;
    // conf_slave.sda_pullup_en = GPIO_PULLUP_ENABLE;
    // conf_slave.scl_io_num = 25;
    // conf_slave.scl_pullup_en = GPIO_PULLUP_ENABLE;
    // conf_slave.mode = I2C_MODE_SLAVE;
    // conf_slave.slave.addr_10bit_en = 0;
    // conf_slave.slave.slave_addr = 0x75;
    // i2c_param_config(i2c_slave_port, &conf_slave);
    // int errCode = i2c_driver_install(i2c_slave_port, conf_slave.mode, 256, 256, 0);
    // ESP_LOGI(TAG, "i2c_driver_install %d", errCode);


// }
