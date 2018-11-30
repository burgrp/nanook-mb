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

  SensorMCP4706 compressorRamp;
  SensorEevPosition eevPosition;
  SensorBoolean compressorRelay;
  SensorBoolean coldWaterPump;
  SensorBoolean hotWaterPump;
  SensorBoolean eevNFault;
  SensorBoolean i2cAlert;
  SensorBoolean pwrOk;
  SensorBoolean psLow;
  SensorBoolean psHigh;
  OnboardPeripherals onboardPeripherals;

  std::list<Sensor *> list;
  std::list<Ticker *> tickers;

  void dump()
  {
    LOGI("/----- REGISTERS ------");
    for (Sensor *s : list)
    {
      char json[100];
      s->toJson(json, sizeof(json));
      LOGI("| %s %s", s->name, json);
    }
    LOGI("\\----------------------");
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
              compressorRamp("compressorRamp"),
              eevPosition("eevPosition"),
              compressorRelay("compressorRelay"),
              coldWaterPump("coldWaterPump"),
              hotWaterPump("hotWaterPump"),
              eevNFault("eevNFault"),
              i2cAlert("i2cAlert"),
              pwrOk("pwrOk"),
              psLow("psLow"),
              psHigh("psHigh"),
              onboardPeripherals(
                  &eevPosition,
                  &compressorRelay,
                  &coldWaterPump,
                  &hotWaterPump,
                  &eevNFault,
                  &i2cAlert,
                  &pwrOk,
                  &psLow,
                  &psHigh),
              list({&coldWaterInTemp,
                    &coldWaterOutTemp,
                    &coldFrigoInTemp,
                    &coldFrigoOutTemp,
                    &hotFrigoInTemp,
                    &hotFrigoOutTemp,
                    &hotWaterInTemp,
                    &hotWaterOutTemp,
                    &coldWaterFlow,
                    &coldWaterPressure,
                    &coldFrigoPressure,
                    &hotWaterFlow,
                    &hotWaterPressure,
                    &hotFrigoPressure,
                    &compressorRamp,
                    &eevPosition,
                    &compressorRelay,
                    &coldWaterPump,
                    &hotWaterPump,
                    &eevNFault,
                    &i2cAlert,
                    &pwrOk,
                    &psLow,
                    &psHigh}),
              tickers({&coldWaterInTemp,
                       &coldWaterOutTemp,
                       &coldFrigoInTemp,
                       &coldFrigoOutTemp,
                       &hotFrigoInTemp,
                       &hotFrigoOutTemp,
                       &hotWaterInTemp,
                       &hotWaterOutTemp,
                       &coldSideAnalogSensors,
                       &hotSideAnalogSensors,
                       &compressorRamp,
                       &onboardPeripherals})
  {

    //TimerHandle_t dumpTimer = xTimerCreate("Sensors dump", pdMS_TO_TICKS(1000), pdTRUE, this, sensorsDumpCb);
    //xTimerStart(dumpTimer, 0);

    TimerHandle_t tickerTimer = xTimerCreate("Sensors tick", pdMS_TO_TICKS(100), pdTRUE, this, sensorsTickCb);
    xTimerStart(tickerTimer, 0);
  }
};