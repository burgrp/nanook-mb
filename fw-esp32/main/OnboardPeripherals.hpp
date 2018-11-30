class OnboardPeripherals : public Ticker
{
  SensorEevPosition *eevPosition;
  SensorBoolean *compressorRelay;
  SensorBoolean *coldWaterPump;
  SensorBoolean *hotWaterPump;
  SensorBoolean *eevNFault;
  SensorBoolean *i2cAlert;
  SensorBoolean *pwrOk;
  SensorBoolean *psLow;
  SensorBoolean *psHigh;

public:
  OnboardPeripherals(
      SensorEevPosition *eevPosition,
      SensorBoolean *compressorRelay,
      SensorBoolean *coldWaterPump,
      SensorBoolean *hotWaterPump,
      SensorBoolean *eevNFault,
      SensorBoolean *i2cAlert,
      SensorBoolean *pwrOk,
      SensorBoolean *psLow,
      SensorBoolean *psHigh)
  {
    this->eevPosition = eevPosition;
    this->compressorRelay = compressorRelay;
    this->coldWaterPump = coldWaterPump;
    this->hotWaterPump = hotWaterPump;
    this->eevNFault = eevNFault;
    this->i2cAlert = i2cAlert;
    this->pwrOk = pwrOk;
    this->psLow = psLow;
    this->psHigh = psHigh;
  }

  void tick() {

  }
};
