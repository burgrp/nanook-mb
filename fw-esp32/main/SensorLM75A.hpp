class SensorLM75A : public SensorFloat, public Ticker
{
public:
  int address;

  SensorLM75A(const char *name, int address) : SensorFloat(name)
  {
  }

  virtual void tick()
  {
    value += 0.01;
  }
};
