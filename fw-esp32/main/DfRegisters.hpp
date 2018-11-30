class Register
{

    void formatTopic(char *buffer, const char *verb)
    {
        snprintf(buffer, TOPIC_BUF_SIZE, "register/nanook.%s/%s", name, verb);
    }

    void subscribeVerb(const char *verb)
    {
        char topic[TOPIC_BUF_SIZE];
        formatTopic(topic, verb);
        LOGI("Subscribing to %s", topic);
        esp_mqtt_client_subscribe(client, topic, 1);
    }

    bool topicIsMy(const char *verb, char *topic, int topicLen)
    {
        char myTopic[TOPIC_BUF_SIZE];
        formatTopic(myTopic, verb);
        return strncmp(myTopic, topic, topicLen) == 0;
    }

  public:
    const int VALUE_JSON_BUF_SIZE = 100;
    const int TOPIC_BUF_SIZE = 200;

    const char *name;
    esp_mqtt_client_handle_t client;

    Register(const char *name, esp_mqtt_client_handle_t client)
    {
        this->name = name;
        this->client = client;
    }

    void subscribe()
    {
        subscribeVerb("get");
        if (!readOnly())
        {
            subscribeVerb("set");
        }
    }

    void checkMessage(char *topic, int topicLen, char *data, int dataLen)
    {
        if (topicIsMy("get", topic, topicLen))
        {
            LOGI("GET %s", name);
            publishValue();
        }

        if (!readOnly() && topicIsMy("set", topic, topicLen))
        {
            char json[VALUE_JSON_BUF_SIZE];
            int len = std::min(VALUE_JSON_BUF_SIZE - 1, topicLen);
            strncpy(json, data, len);
            json[len] = 0;

            LOGI("SET %s = %s", name, json);
            fromJson(json);
            publishValue();
        }
    }

    void publishValue()
    {
        char topic[TOPIC_BUF_SIZE];
        snprintf(topic, sizeof(topic), "register/nanook.%s/is", name);
        char data[VALUE_JSON_BUF_SIZE];
        toJson(data, sizeof(data));

        LOGI("PUB %s %s", name, data);
        esp_mqtt_client_publish(client, topic, data, strlen(data), 1, 0);
    }

    void advertise() {
        LOGI("ADV %s", name);
    }

    virtual bool readOnly()
    {
        return true;
    }

    virtual void toJson(char *buffer, int len) = 0;
    virtual void fromJson(char *json) = 0;
};

class SensorRegister : public Register
{
    Sensor *sensor;

  public:
    SensorRegister(Sensor *sensor, esp_mqtt_client_handle_t client) : Register(sensor->name, client)
    {
        this->sensor = sensor;
    }

    virtual void toJson(char *buffer, int len)
    {
        sensor->toJson(buffer, len);
    }

    virtual void fromJson(char *json)
    {
        sensor->fromJson(json);
    }
};

class DfRegisters
{
    Sensors *sensors;
    std::list<Register *> registers;

    const char* advertiseTopic = "register/advertise!";

    void handleMqttEvent(esp_mqtt_event_handle_t event)
    {
        switch (event->event_id)
        {
        case MQTT_EVENT_CONNECTED:
            for (Register *reg : registers)
            {
                reg->subscribe();
            }
            ;
            LOGI("Subscribing to %s", advertiseTopic);
            esp_mqtt_client_subscribe(event->client, advertiseTopic, 1);
            break;

        case MQTT_EVENT_DATA:
            LOGI("MQTT_EVENT_DATA %.*s %.*s", event->topic_len, event->topic, event->data_len, event->data);
            for (Register *reg : registers)
            {
                reg->checkMessage(event->topic, event->topic_len, event->data, event->data_len);
            }
            if (strncmp(advertiseTopic, event->topic, event->topic_len) == 0) {
                for (Register *reg : registers) {
                    reg->advertise();
                }
            }
            break;

        case MQTT_EVENT_DISCONNECTED:
        case MQTT_EVENT_SUBSCRIBED:
        case MQTT_EVENT_UNSUBSCRIBED:
        case MQTT_EVENT_PUBLISHED:
        case MQTT_EVENT_ERROR:
            break;
        }
    }

    static esp_err_t mqtt_event_handler(esp_mqtt_event_handle_t event)
    {
        ((DfRegisters *)event->user_context)->handleMqttEvent(event);
        return ESP_OK;
    }

  public:
    DfRegisters(Sensors *sensors)
    {
        this->sensors = sensors;

        esp_mqtt_client_config_t mqtt_cfg = {};

        mqtt_cfg.uri = CONFIG_NANOOK_MQTT_BROKER;
        mqtt_cfg.event_handle = mqtt_event_handler;
        mqtt_cfg.user_context = this;

        esp_mqtt_client_handle_t client = esp_mqtt_client_init(&mqtt_cfg);
        esp_mqtt_client_start(client);

        for (Sensor *s : sensors->list)
        {
            registers.push_back(new SensorRegister(s, client));
        }
    }
};