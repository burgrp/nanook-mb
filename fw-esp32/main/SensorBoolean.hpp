class SensorBoolean : public Sensor
{
public:
  int value = 1;

  SensorBoolean(const char *name) : Sensor(name)
  {
  }

  virtual void toJson(char *buffer, int len)
  {
    strncpy(buffer, value ? "true" : "false", len);
  }
};
