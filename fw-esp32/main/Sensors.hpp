class Sensor
{
public:
  const char *name;
  Sensor *next;

  Sensor(const char *name, Sensor **first)
  {
    this->name = name;
    this->next = nullptr;

    while (*first) {
      first = &((*first)->next);
    }
    *first = this;
  }

  virtual void toJson(char* buffer, int len) = 0;
};

class FloatSensor: public Sensor {
public:
  float value = 3.1;
  
  FloatSensor(const char *name, Sensor **first): Sensor(name, first) {

  }

  virtual void toJson(char* buffer, int len) {
    snprintf(buffer, len, "%f", value);
  }
};

class SensorLM75A : public FloatSensor
{
public:
  int address;

  SensorLM75A(const char *name, int address, Sensor **first) : FloatSensor(name, first)
  {
  }
};

class Sensors
{

public:
  SensorLM75A *coldWaterInTemp;
  SensorLM75A *coldWaterOutTemp;
  SensorLM75A *coldFrigoInTemp;
  SensorLM75A *coldFrigoOutTemp;
  SensorLM75A *hotFrigoInTemp;
  SensorLM75A *hotFrigoOutTemp;
  SensorLM75A *hotWaterInTemp;
  SensorLM75A *hotWaterOutTemp;
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

  Sensor *first = nullptr;

  Sensors()
  {
    coldWaterInTemp = new SensorLM75A("coldWaterInTemp", 0x48, &first);
    coldWaterOutTemp = new SensorLM75A("coldWaterOutTemp", 0x49, &first);
    coldFrigoInTemp = new SensorLM75A("coldFrigoInTemp", 0x4A, &first);
    coldFrigoOutTemp = new SensorLM75A("coldFrigoOutTemp", 0x4B, &first);
    hotFrigoInTemp = new SensorLM75A("hotFrigoInTemp", 0x4D, &first);
    hotFrigoOutTemp = new SensorLM75A("hotFrigoOutTemp", 0x4C, &first);
    hotWaterInTemp = new SensorLM75A("hotWaterInTemp", 0x4E, &first);
    hotWaterOutTemp = new SensorLM75A("hotWaterOutTemp", 0x4F, &first);

    for (Sensor *s = first; s; s = s->next)
    {
      char json[100];
      s->toJson(json, sizeof(json));
      LOGI("%s %s", s->name, json);
    }
  }
};