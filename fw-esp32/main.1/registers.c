#include "nanook.h"

NanookRegisters registers;

#define REGISTERS_COUNT (sizeof(NanookRegisters) / sizeof(int))

int registersCount = REGISTERS_COUNT;

char* registerNames[REGISTERS_COUNT] = {
  "coldWaterInTemp",
  "coldWaterOutTemp",
  "coldFrigoInTemp",
  "coldFrigoOutTemp",
  "hotFrigoInTemp",
  "hotFrigoOutTemp",
  "hotWaterInTemp",
  "hotWaterOutTemp",
  "coldWaterFlow",
  "coldWaterPressure",
  "coldFrigoPressure",
  "hotWaterFlow",
  "hotWaterPressure",
  "hotFrigoPressure",
  "compressorRamp",
  "compressorRelay",
  "eevPosition",
  "coldWaterPump",
  "hotWaterPump",
  "eevNFault",
  "i2cAlert",
  "pwrOk",
  "psLow",
  "psHigh"    
};

int* registersByIndex = (int*)&registers;

void dump_registers() {
    for (int r = 0; r < registersCount; r++) {
        LOGI("%02d: %s = %d", r, registerNames[r], registersByIndex[r]);
    }
}

void registers_init() {
    for (int r = 0; r < registersCount; r++) {
        registersByIndex[r] = REG_VALUE_UNKNOWN;
    }
}