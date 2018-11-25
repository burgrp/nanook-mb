#include "mgos.h"
#include "mgos_gpio.h"
#include "mgos_timers.h"

#define UNUSED(x) (void)(x)

int address;
int sdaPin;
int sclPin;

int bitCounter;
int byteCounter;
char rxByte;
bool masterReads;

int sda;
int scl;

char *rxBuffer;
int rxBufferSize;

char *txBuffer;
int txBufferSize;

mgos_cb_t startRdIsrCb;
void *startRdIsrCbArg;
mgos_cb_t stopRdIsrCb;
void *stopRdIsrCbArg;
mgos_cb_t stopRdEventCb;
void *stopRdEventCbArg;
mgos_cb_t startWrIsrCb;
void *startWrIsrCbArg;
mgos_cb_t stopWrIsrCb;
void *stopWrIsrCbArg;
mgos_cb_t stopWrEventCb;
void *stopWrEventCbArg;

void sdaIntHandler()
{
  mgos_ints_disable();
  
  sda = mgos_gpio_read(sdaPin);
  scl = mgos_gpio_read(sclPin);

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
  mgos_ints_enable();
}

int releaseSdaTimerCounter;

void sclIntHandler()
{
  mgos_ints_disable();
  
  sda = mgos_gpio_read(sdaPin);
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
          if (!masterReads && byteCounter < rxBufferSize)
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
    
    if (bitCounter == 8)
    { 

      if (byteCounter == -1)
      {
        if (startRdIsrCb && masterReads)
        {
          startRdIsrCb(startRdIsrCbArg);
        }
        if (startWrIsrCb && !masterReads)
        {
          startWrIsrCb(startWrIsrCbArg);
        }
      }

      if (!masterReads && byteCounter == rxBufferSize - 1)
      {
        if (stopWrIsrCb)
        {
          stopWrIsrCb(stopWrIsrCbArg);
        }
        if (stopWrEventCb)
        {
          mgos_invoke_cb(stopWrEventCb, stopWrEventCbArg, true);
        }
      }

      if (masterReads && byteCounter == txBufferSize - 1)
      {
        if (stopRdIsrCb)
        {
          stopRdIsrCb(stopRdIsrCbArg);
        }
        if (stopRdEventCb)
        {
          mgos_invoke_cb(stopRdEventCb, stopRdEventCbArg, true);
        }
      }
    }

    bitCounter++;
    if (bitCounter == 9)
    {
      bitCounter = 0;
      byteCounter++;
    }

    bool pullSda =
        (bitCounter == 8 && (byteCounter == -1 || // send ACK on first byte
                             (!masterReads && byteCounter < rxBufferSize))) ||
        (bitCounter < 8 && masterReads && byteCounter > -1 && byteCounter < txBufferSize && !((txBuffer[byteCounter] >> (7 - bitCounter)) & 1));

    releaseSdaTimerCounter = pullSda ? 10 : 0;
    mgos_gpio_set_mode(sdaPin, pullSda ? MGOS_GPIO_MODE_OUTPUT_OD : MGOS_GPIO_MODE_INPUT);
    if (!pullSda)
    {
      mgos_gpio_enable_int(sdaPin);
    }
  }

  mgos_ints_enable();
}

void safetyReleaseSdaTimerHandler(void *arg)
{
  UNUSED(arg);
  if (releaseSdaTimerCounter > 0)
  {
    releaseSdaTimerCounter--;
    if (releaseSdaTimerCounter == 0)
    {
      mgos_gpio_set_mode(sdaPin, MGOS_GPIO_MODE_INPUT);
      LOG(LL_WARN, ("SDA released by safety timer"));
    }
  }
}

void i2c_slave_set_rx_buffer(void *buffer, int size)
{
  rxBuffer = (char *)buffer;
  rxBufferSize = size;
}

void i2c_slave_set_tx_buffer(void *buffer, int size)
{
  txBuffer = (char *)buffer;
  txBufferSize = size;
}

mgos_cb_t startRdIsrCb;
void *startRdIsrCbArg;
mgos_cb_t stopRdIsrCb;
void *stopRdIsrCbArg;
mgos_cb_t stopRdEventCb;
void *stopRdEventCbArg;
mgos_cb_t startWrIsrCb;
void *startWrIsrCbArg;
mgos_cb_t stopWrIsrCb;
void *stopWrIsrCbArg;
mgos_cb_t stopWrEventCb;
void *stopWrEventCbArg;

void i2c_slave_set_start_rd_isr_cb(mgos_cb_t cb, void *arg)
{
  startRdIsrCb = cb;
  startRdIsrCbArg = arg;
}

void i2c_slave_set_stop_rd_isr_cb(mgos_cb_t cb, void *arg)
{
  stopRdIsrCb = cb;
  stopRdIsrCbArg = arg;
}

void i2c_slave_set_stop_rd_event_cb(mgos_cb_t cb, void *arg)
{
  stopRdEventCb = cb;
  stopRdEventCbArg = arg;
}

void i2c_slave_set_start_wr_isr_cb(mgos_cb_t cb, void *arg)
{
  startWrIsrCb = cb;
  startWrIsrCbArg = arg;
}

void i2c_slave_set_stop_wr_isr_cb(mgos_cb_t cb, void *arg)
{
  stopWrIsrCb = cb;
  stopWrIsrCbArg = arg;
}

void i2c_slave_set_stop_wr_event_cb(mgos_cb_t cb, void *arg)
{
  stopWrEventCb = cb;
  stopWrEventCbArg = arg;
}

bool mgos_mg_i2c_slave_init()
{
  if (mgos_config_get_i2c_slave_enable(&mgos_sys_config))
  {
    address = mgos_config_get_i2c_slave_address(&mgos_sys_config);
    sdaPin = mgos_config_get_i2c_slave_sda_gpio(&mgos_sys_config);
    sclPin = mgos_config_get_i2c_slave_scl_gpio(&mgos_sys_config);
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

    mgos_set_timer(1000, MGOS_TIMER_REPEAT, safetyReleaseSdaTimerHandler, NULL);
  }

  return true;
}
