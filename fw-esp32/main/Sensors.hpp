/*
    while (*list)
    {
      list = &((*list)->next);
    }
    *list = this;
*/

class Ticker
{
public:
  virtual void tick() = 0;
};

class Sensor
{
public:
  const char *name;

  Sensor(const char *name)
  {
    this->name = name;
  }

  virtual void toJson(char *buffer, int len) = 0;
};

class FloatSensor : public Sensor
{
public:
  float value = 3.1;

  FloatSensor(const char *name) : Sensor(name)
  {
  }

  virtual void toJson(char *buffer, int len)
  {
    snprintf(buffer, len, "%f", value);
  }
};

class SensorLM75A : public FloatSensor, Ticker
{
public:
  int address;

  SensorLM75A(const char *name, int address) : FloatSensor(name)
  {
  }

  virtual void tick()
  {
    LOGI("LM75A tick %s", name);
  }
};

class Sensors
{

public:
  SensorLM75A coldWaterInTemp;
  SensorLM75A coldWaterOutTemp;
  SensorLM75A coldFrigoInTemp;
  SensorLM75A coldFrigoOutTemp;
  SensorLM75A hotFrigoInTemp;
  SensorLM75A hotFrigoOutTemp;
  SensorLM75A hotWaterInTemp;
  SensorLM75A hotWaterOutTemp;

  // SensorIasFlow coldWaterFlow;
  // SensorIasPressure coldWaterPressure;
  // SensorIasPressure coldFrigoPressure;
  // SensorIasFlow hotWaterFlow;
  // SensorIasPressure hotWaterPressure;
  // SensorIasPressure hotFrigoPressure;

  // compressorRamp;
  // compressorRelay;
  // eevPosition;
  // coldWaterPump;
  // hotWaterPump;
  // eevNFault;
  // i2cAlert;
  // pwrOk;
  // psLow;
  // psHigh;

  //Sensor *list = nullptr;

  //std::list<Sensor> list;// = new std::list();

  std::list<Sensor *> list;

  void dump()
  {
    for (Sensor *s : list)
    {
      char json[100];
      s->toJson(json, sizeof(json));
      LOGI("%s %s", s->name, json);
    }
  }

  static void vTimerCallback(TimerHandle_t xTimer)
  {
    Sensors *sensors = (Sensors *)pvTimerGetTimerID(xTimer);
    sensors->dump();
  }

  Sensors() : coldWaterInTemp("coldWaterInTemp", 0x48),
              coldWaterOutTemp("coldWaterOutTemp", 0x49),
              coldFrigoInTemp("coldFrigoInTemp", 0x4A),
              coldFrigoOutTemp("coldFrigoOutTemp", 0x4B),
              hotFrigoInTemp("hotFrigoInTemp", 0x4D),
              hotFrigoOutTemp("hotFrigoOutTemp", 0x4C),
              hotWaterInTemp("hotWaterInTemp", 0x4E),
              hotWaterOutTemp("hotWaterOutTemp", 0x4F),
              list({
                  &coldWaterInTemp,
                  &coldWaterOutTemp,
                  &coldFrigoInTemp,
                  &coldFrigoOutTemp,
                  &hotFrigoInTemp,
                  &hotFrigoOutTemp,
                  &hotWaterInTemp,
                  &hotWaterOutTemp,
              })
  {

    TimerHandle_t timer = xTimerCreate("Sensors", pdMS_TO_TICKS(1000), pdTRUE, this, vTimerCallback);
    xTimerStart(timer, pdMS_TO_TICKS(1000));
  }
};