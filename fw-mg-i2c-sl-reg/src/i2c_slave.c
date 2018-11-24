#include "mgos.h"
#include "mgos_gpio.h"

int address;
int sdaPin;
int sclPin;

int bitCounter;
int byteCounter;
char rxByte;
bool masterReads;

int sda;
int scl;

char rxBuffer[5];
char txBuffer[5] = {1, 2, 3, 4, 0xAB};

void sdaIntHandler()
{
  sda = mgos_gpio_read(sdaPin);

  if (scl)
  {

    if (sda)
    {
      // stop condition
      mgos_gpio_disable_int(sclPin);
    }
    else
    {
      // start condition
      bitCounter = -1;
      byteCounter = -1;
      mgos_gpio_enable_int(sclPin);
    }
  }
}

void sclIntHandler()
{
  scl = mgos_gpio_read(sclPin);

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
        if (byteCounter == -1)
        {
          if (rxByte >> 1 != address)
          {
            mgos_gpio_disable_int(sclPin);
          }
          else
          {
            masterReads = rxByte & 1;
          }
        }
        else
        {
          if (!masterReads && byteCounter < (int)sizeof(rxBuffer))
          {
            rxBuffer[byteCounter] = rxByte;
          }
        }
      }
    }
  }
  else
  {
    // on falling edge

    bitCounter++;
    if (bitCounter == 9)
    {
      bitCounter = 0;
      byteCounter++;
    }

    bool pullSda =
        (bitCounter == 8 && (byteCounter == -1 || // send ACK on first byte
                             (!masterReads && byteCounter < (int)sizeof(rxBuffer)))) ||
        (bitCounter < 8 && masterReads && byteCounter > -1 && byteCounter < (int)sizeof(txBuffer) && !((txBuffer[byteCounter] >> (7 - bitCounter)) & 1));

    mgos_gpio_set_mode(sdaPin, pullSda ? MGOS_GPIO_MODE_OUTPUT_OD : MGOS_GPIO_MODE_INPUT);
    if (!pullSda)
    {
      mgos_gpio_enable_int(sdaPin);
    }
  }
}

bool i2c_slave_init()
{
  address = mgos_config_get_i2c_slave_address(&mgos_sys_config);
  sdaPin = mgos_config_get_i2c_slave_sda(&mgos_sys_config);
  sclPin = mgos_config_get_i2c_slave_scl(&mgos_sys_config);
  LOG(LL_INFO, ("I2C slave 0x%02X on pins SDA: %d, SCL: %d", address, sdaPin, sclPin));

  mgos_gpio_set_pull(sdaPin, MGOS_GPIO_PULL_NONE);
  mgos_gpio_set_pull(sclPin, MGOS_GPIO_PULL_NONE);

  mgos_gpio_set_mode(sdaPin, MGOS_GPIO_MODE_INPUT);
  mgos_gpio_set_mode(sclPin, MGOS_GPIO_MODE_INPUT);

  sda = mgos_gpio_read(sdaPin);
  scl = mgos_gpio_read(sclPin);

  mgos_gpio_write(sdaPin, 0);
  mgos_gpio_write(sclPin, 0);

  mgos_gpio_set_int_handler_isr(sdaPin, MGOS_GPIO_INT_EDGE_ANY, sdaIntHandler, NULL);
  mgos_gpio_enable_int(sdaPin);

  mgos_gpio_set_int_handler_isr(sclPin, MGOS_GPIO_INT_EDGE_ANY, sclIntHandler, NULL);
  mgos_gpio_enable_int(sclPin);

  return true;
}
