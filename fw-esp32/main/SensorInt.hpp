class SensorInt : public Sensor
{
public:
  int value = 1;

  SensorInt(const char *name) : Sensor(name)
  {
  }

  virtual void toJson(char *buffer, int len)
  {
    snprintf(buffer, len, "%d", value);
  }
};
