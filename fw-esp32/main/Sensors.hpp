class SensorIasFlow : public SensorFloat
{
public:
  SensorIasFlow(const char *name) : SensorFloat(name)
  {
  }
};

class SensorIasPressure : public SensorFloat
{
public:
  SensorIasPressure(const char *name) : SensorFloat(name)
  {
  }
};

class AnalogSensorsBoard : public Ticker
{
public:
  AnalogSensorsBoard(int address, SensorIasFlow *waterFlow, SensorIasPressure *waterPressure, SensorIasPressure *frigoPressure)
  {
  }

  virtual void tick()
  {
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

  SensorIasFlow coldWaterFlow;
  SensorIasPressure coldWaterPressure;
  SensorIasPressure coldFrigoPressure;
  AnalogSensorsBoard coldSideAnalogSensors;

  SensorIasFlow hotWaterFlow;
  SensorIasPressure hotWaterPressure;
  SensorIasPressure hotFrigoPressure;
  AnalogSensorsBoard hotSideAnalogSensors;

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

  std::list<Sensor *> list;
  std::list<Ticker *> tickers;

  void dump()
  {
    for (Sensor *s : list)
    {
      char json[100];
      s->toJson(json, sizeof(json));
      LOGI("%s %s", s->name, json);
    }
  }

  static void sensorsDumpCb(TimerHandle_t xTimer)
  {
    Sensors *sensors = (Sensors *)pvTimerGetTimerID(xTimer);
    sensors->dump();
  }

  static void sensorsTickCb(TimerHandle_t xTimer)
  {
    Sensors *sensors = (Sensors *)pvTimerGetTimerID(xTimer);
    for (Ticker *t : sensors->tickers)
    {
      t->tick();
    }
  }

  Sensors() : coldWaterInTemp("coldWaterInTemp", 0x48),
              coldWaterOutTemp("coldWaterOutTemp", 0x49),
              coldFrigoInTemp("coldFrigoInTemp", 0x4A),
              coldFrigoOutTemp("coldFrigoOutTemp", 0x4B),
              hotFrigoInTemp("hotFrigoInTemp", 0x4D),
              hotFrigoOutTemp("hotFrigoOutTemp", 0x4C),
              hotWaterInTemp("hotWaterInTemp", 0x4E),
              hotWaterOutTemp("hotWaterOutTemp", 0x4F),
              coldWaterFlow("coldWaterFlow"),
              coldWaterPressure("coldWaterPressure"),
              coldFrigoPressure("coldFrigoPressure"),
              coldSideAnalogSensors(0x70, &coldWaterFlow, &coldWaterPressure, &coldFrigoPressure),
              hotWaterFlow("hotWaterFlow"),
              hotWaterPressure("hotWaterPressure"),
              hotFrigoPressure("hotFrigoPressure"),
              hotSideAnalogSensors(0x71, &hotWaterFlow, &hotWaterPressure, &hotFrigoPressure),

              list({
                  &coldWaterInTemp,
                  &coldWaterOutTemp,
                  &coldFrigoInTemp,
                  &coldFrigoOutTemp,
                  &hotFrigoInTemp,
                  &hotFrigoOutTemp,
                  &hotWaterInTemp,
                  &hotWaterOutTemp,
              }),
              tickers({&coldWaterInTemp,
                       &coldWaterOutTemp,
                       &coldFrigoInTemp,
                       &coldFrigoOutTemp,
                       &hotFrigoInTemp,
                       &hotFrigoOutTemp,
                       &hotWaterInTemp,
                       &hotWaterOutTemp})
  {

    TimerHandle_t dumpTimer = xTimerCreate("Sensors dump", pdMS_TO_TICKS(1000), pdTRUE, this, sensorsDumpCb);
    xTimerStart(dumpTimer, 0);

    TimerHandle_t tickerTimer = xTimerCreate("Sensors tick", pdMS_TO_TICKS(100), pdTRUE, this, sensorsTickCb);
    xTimerStart(tickerTimer, 0);
  }
};