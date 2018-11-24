#include "mgos.h"
#include "mgos_vfs.h"
#include "frozen.h"
#include "mgos_mqtt.h"
#include "mgos_timers.h"
#include "mgos_gpio.h"

#define UNUSED(x) (void)(x)

typedef struct
{
  char *name;
  char *meta;
  int value;
  bool changedByMqtt;
  bool changedByI2C;
} Register;

int registerCount = 0;
Register *registers;

bool readRegMap()
{

  const char *fileName = "/regmap.json";

  char *jsonStr = json_fread(fileName);
  if (!jsonStr)
  {
    LOG(LL_ERROR, ("Error reading file %s", fileName));
    return false;
  }
  int jsonStrLen = strlen(jsonStr);

  struct json_token regDef;
  for (registerCount = 0; json_scanf_array_elem(jsonStr, jsonStrLen, "", registerCount, &regDef) != -1; registerCount++)
    ;
  LOG(LL_INFO, ("There are %d registers defined:", registerCount));
  registers = calloc(registerCount, sizeof(Register));

  for (int i = 0; i < registerCount; i++)
  {
    if (json_scanf_array_elem(jsonStr, jsonStrLen, "", i, &regDef) != -1)
    {
      char name[200];
      if (json_scanf(regDef.ptr, regDef.len, "{name: %200s}", name) != 1)
      {
        LOG(LL_ERROR, ("Register %d has no name", i));
        return false;
      }

      registers[i].name = malloc(strlen(name) + 1);
      strcpy(registers[i].name, name);

      struct json_token meta;
      if (json_scanf(regDef.ptr, regDef.len, "{meta: %T}", &meta) == 1)
      {
        registers[i].meta = strndup(meta.ptr, meta.len);
      }
      else
      {
        registers[i].meta = strdup("{}");
      }

      // disabled due to bug in json_setf, which srews up resulting JSON
      // char metaBuffer[1000];
      // struct json_out metaOut = JSON_OUT_BUF(metaBuffer, sizeof(metaBuffer));
      // json_setf(registers[i].meta, strlen(registers[i].meta), &metaOut, ".device", "%Q", mgos_config_get_device_id(&mgos_sys_config));
      // free(registers[i].meta);
      // registers[i].meta = strndup(metaOut.u.buf.buf, metaOut.u.buf.len);

      LOG(LL_INFO, ("%d: %s", i, registers[i].name));
    }
  }

  free(jsonStr);
  return true;
}

void advertise()
{
  for (int i = 0; i < registerCount; i++)
  {
    Register *reg = &registers[i];
    char topic[200];
    snprintf(topic, sizeof(topic), "register/%s/advertise", reg->name);

    mgos_mqtt_pub(topic, reg->meta, strlen(reg->meta), 1, false);
  }
}

void mqttAdvertiseHandler(struct mg_connection *nc, const char *topic, int topic_len, const char *msg, int msg_len, void *ud)
{
  UNUSED(nc);
  UNUSED(topic);
  UNUSED(topic_len);
  UNUSED(msg);
  UNUSED(msg_len);
  UNUSED(ud);

  advertise();
}

void publishValue(Register *reg)
{
  LOG(LL_INFO, ("PUB %s %d", reg->name, reg->value));

  char topic[200];
  snprintf(topic, sizeof(topic), "register/%s/is", reg->name);

  char message[20];
  snprintf(message, sizeof(message), "%d", reg->value);

  mgos_mqtt_pub(topic, message, strlen(message), 1, false);
}

void mqttRegHandler(struct mg_connection *nc, const char *topic, int topic_len, const char *msg, int msg_len, void *ud)
{
  UNUSED(nc);
  UNUSED(topic_len);
  UNUSED(msg);
  UNUSED(msg_len);
  UNUSED(ud);

  Register *reg = (Register *)ud;
  int verbOffset = 9 /* register/ */ + strlen(reg->name) + 1;
  const char *verb = &topic[verbOffset];
  int verbLen = topic_len - verbOffset;

  // get or set?
  if (verbLen == 3 && verb[1] == 'e' && verb[2] == 't')
  {
    if (verb[0] == 's')
    {

      int value = 0;
      if (json_scanf(msg, msg_len, "%d", &value) == 1)
      {
        LOG(LL_INFO, ("SET %s=%d", reg->name, value));
        reg->value = value;
        reg->changedByMqtt = true;
        publishValue(reg);
      }
      else
      {
        LOG(LL_INFO, ("SET %s - error parsing \"%.*s\"", reg->name, msg_len, msg));
      }
    }
    else if (verb[0] == 'g')
    {

      LOG(LL_INFO, ("GET %s", reg->name));
      publishValue(reg);
    }
  }
}

bool mqttSubscribe()
{
  mgos_mqtt_sub("register/advertise!", mqttAdvertiseHandler, NULL);

  for (int i = 0; i < registerCount; i++)
  {
    char topic[200];
    snprintf(topic, sizeof(topic), "register/%s/#", registers[i].name);
    mgos_mqtt_sub(topic, mqttRegHandler, &registers[i]);
  }

  return true;
}

void advertiseTimerHandler(void *arg)
{
  UNUSED(arg);
  advertise();
}

int bitCounter;
int byteCounter;
char rxByte;
bool rxMode;
bool enabled;

void i2cDebug(void *arg)
{
  UNUSED(arg);
  LOG(LL_INFO, ("I2C cnt: %d %d, %d, %x, %d", bitCounter, byteCounter, rxMode, rxByte, enabled));
}

//bool sda = true;
//bool scl = true;

int sdaPin;
int sclPin;


char rxBuffer[5];
char txBuffer[5];

// typedef enum {
//   IDLE,
//   RX_ADDR,
//   RX_DATA,
//   TX_DATA,
//   TX_ACK,
//   RX_ACK
// } I2cState;

// I2cState state;

void sdaIntHandler()
{
  int sda = mgos_gpio_read(sdaPin);
  int scl = mgos_gpio_read(sclPin);

  if (!sda && scl)
  {
    // start condition
    bitCounter = -1;
    byteCounter = -1;
    enabled = true;
  }
}

void sclIntHandler()
{
  int sda = mgos_gpio_read(sdaPin);
  int scl = mgos_gpio_read(sclPin);

  if (enabled)
  {

    if (scl)
    {

      // on rising edge

      if (bitCounter < 8)
      {
        if (bitCounter == 0)
        {
          rxByte = 0;
        }

        rxByte = (rxByte << 1) | sda;

        if (bitCounter == 7)
        {
         // address = rxByte >> 1;
          //enabled = address == 0x75;
          rxMode = true;
        }
      }
    }
    else
    {
      // on falling edge

      bitCounter++;

      mgos_gpio_set_mode(sdaPin,
                         (bitCounter == 8 && (rxMode || byteCounter == -1))
                             ? MGOS_GPIO_MODE_OUTPUT
                             : MGOS_GPIO_MODE_INPUT);

      if (bitCounter == 9)
      {
        bitCounter = 0;
      }
    }
  }
}

bool initI2C()
{
  sdaPin = mgos_config_get_i2c_slave_sda(&mgos_sys_config);
  sclPin = mgos_config_get_i2c_slave_scl(&mgos_sys_config);

  mgos_gpio_set_pull(sdaPin, MGOS_GPIO_PULL_UP);
  mgos_gpio_set_pull(sclPin, MGOS_GPIO_PULL_UP);

  mgos_gpio_set_mode(sdaPin, MGOS_GPIO_MODE_INPUT);
  mgos_gpio_set_mode(sclPin, MGOS_GPIO_MODE_INPUT);

  mgos_gpio_write(sdaPin, 0);
  mgos_gpio_write(sclPin, 0);

  mgos_gpio_set_int_handler_isr(sdaPin, MGOS_GPIO_INT_EDGE_ANY, sdaIntHandler, NULL);
  mgos_gpio_enable_int(sdaPin);

  mgos_gpio_set_int_handler_isr(sclPin, MGOS_GPIO_INT_EDGE_ANY, sclIntHandler, NULL);
  mgos_gpio_enable_int(sclPin);
  return true;
}

enum mgos_app_init_result mgos_app_init(void)
{
  LOG(LL_INFO, ("--------------------------------------------"));

  if (!readRegMap())
  {
    return MGOS_APP_INIT_ERROR;
  }

  if (!initI2C())
  {
    return MGOS_APP_INIT_ERROR;
  }

  if (!mqttSubscribe())
  {
    return MGOS_APP_INIT_ERROR;
  }

  mgos_set_timer(10000, MGOS_TIMER_REPEAT, advertiseTimerHandler, NULL);

  mgos_set_timer(1000, MGOS_TIMER_REPEAT, i2cDebug, NULL);

  LOG(LL_INFO, ("--------------------------------------------"));

  return MGOS_APP_INIT_SUCCESS;
}
