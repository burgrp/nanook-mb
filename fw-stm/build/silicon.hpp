#ifndef SILICON_HPP
#define SILICON_HPP

#include <stdlib.h>

namespace target {
  namespace interrupts {
    namespace Internal {
      const int Reset = 0;
      const int NMI = 1;
      const int HardFault = 2;
      const int SVCall = 10;
      const int PendSV = 13;
      const int SysTick = 14;
    }
    namespace External {
      const int WWDG = 0;
      const int PVD = 1;
      const int RTC = 2;
      const int FLASH = 3;
      const int RCC = 4;
      const int EXTI0_1 = 5;
      const int EXTI2_3 = 6;
      const int EXTI4_15 = 7;
      const int DMA1_CH1 = 9;
      const int DMA1_CH2_3 = 10;
      const int DMA1_CH4_5 = 11;
      const int ADC = 12;
      const int TIM1_BRK_UP_TRG_COM = 13;
      const int TIM1_CC = 14;
      const int TIM3 = 16;
      const int TIM6 = 17;
      const int TIM14 = 19;
      const int TIM15 = 20;
      const int TIM16 = 21;
      const int TIM17 = 22;
      const int I2C1 = 23;
      const int I2C2 = 24;
      const int SPI1 = 25;
      const int SPI2 = 26;
      const int USART1 = 27;
      const int USART2 = 28;
      const int USART3_4_5_6 = 29;
      const int USB = 31;
    }
    namespace All {
      const int Reset = 0;
      const int NMI = 1;
      const int HardFault = 2;
      const int SVCall = 10;
      const int PendSV = 13;
      const int SysTick = 14;
      const int WWDG = 15;
      const int PVD = 16;
      const int RTC = 17;
      const int FLASH = 18;
      const int RCC = 19;
      const int EXTI0_1 = 20;
      const int EXTI2_3 = 21;
      const int EXTI4_15 = 22;
      const int DMA1_CH1 = 24;
      const int DMA1_CH2_3 = 25;
      const int DMA1_CH4_5 = 26;
      const int ADC = 27;
      const int TIM1_BRK_UP_TRG_COM = 28;
      const int TIM1_CC = 29;
      const int TIM3 = 31;
      const int TIM6 = 32;
      const int TIM14 = 34;
      const int TIM15 = 35;
      const int TIM16 = 36;
      const int TIM17 = 37;
      const int I2C1 = 38;
      const int I2C2 = 39;
      const int SPI1 = 40;
      const int SPI2 = 41;
      const int USART1 = 42;
      const int USART2 = 43;
      const int USART3_4_5_6 = 44;
      const int USB = 46;
    }
  }
}

#include ".././node_modules/@device.farm/si-stm32f0x0/generated/crc.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/gpio_b_f.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/gpio_a.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/spi.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/pwr.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/i2c.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/iwdg.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/wwdg.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/tim_1.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/tim_3.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/tim_14.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/tim_6_7.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/exti.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/nvic.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/dma.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/rcc.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/syscfg.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/adc.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/usart.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/rtc.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/tim_15.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/tim_16_17.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/flash.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/dbgmcu.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/usb.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/scb.cpp"
#include ".././node_modules/@device.farm/si-stm32f0x0/generated/stk.cpp"
#include ".././node_modules/@device.farm/si-application-events/application-events.cpp"
#include ".././node_modules/@device.farm/si-stm32-i2c/i2c-hw-master.cpp"
#include ".././node_modules/@device.farm/si-stm32-i2c/i2c-hw-slave.cpp"
#include ".././node_modules/@device.farm/si-generic-timer/generic-timer.cpp"
#include ".././node_modules/@device.farm/si-stm32-timer/stm32-timer.cpp"
#include ".././rgb-led.cpp"
#include ".././main.cpp"

#endif // SILICON_HPP