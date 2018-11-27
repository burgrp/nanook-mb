class Sensor
{
public:
  const char* name;

  Sensor(const char* name)
  {
    this->name = name;
  }

  virtual void toJson(char *buffer, int len) = 0;
};
