class SensorMCP4706 : public SensorFloat, public Ticker
{
public:
  SensorMCP4706(const char *name) : SensorFloat(name)
  {
  }
  void tick()
  {
  }
};
