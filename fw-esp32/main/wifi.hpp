class WiFi
{

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

  public:
    WiFi()
    {
        tcpip_adapter_init();
        ESP_ERROR_CHECK(esp_event_loop_init(event_handler, NULL));

        wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
        ESP_ERROR_CHECK(esp_wifi_init(&cfg));

        wifi_config_t wifi_config = {};

        strncpy((char*)wifi_config.sta.ssid, CONFIG_NANOOK_WIFI_SSID, sizeof(wifi_config.sta.ssid));
        strncpy((char*)wifi_config.sta.password, CONFIG_NANOOK_WIFI_PASSWORD, sizeof(wifi_config.sta.password));

        ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
        ESP_ERROR_CHECK(esp_wifi_set_config(ESP_IF_WIFI_STA, &wifi_config));
        ESP_ERROR_CHECK(esp_wifi_start());
    }
};