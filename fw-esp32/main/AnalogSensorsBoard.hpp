class SensorIasFlow : public SensorFloat
{
public:
  SensorIasFlow(const char* name) : SensorFloat(name)
  {
  }
};

class SensorIasPressure : public SensorFloat
{
public:
  SensorIasPressure(const char* name) : SensorFloat(name)
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
