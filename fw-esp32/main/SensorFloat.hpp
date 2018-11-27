class SensorFloat : public Sensor
{
public:
  float value = ((float)(((int)this) & 0xFFF)) / 100 - 20;

  SensorFloat(const char *name) : Sensor(name)
  {
  }

  virtual void toJson(char *buffer, int len)
  {
    snprintf(buffer, len, "%f", value);
  }
};