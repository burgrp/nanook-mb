const int VALUE_UNKNOWN = -1;

enum Command {
	CMD_NONE,
	CMD_I2C_SET_RGB_LED,
	CMD_RUN_EEV,
	CMD_SET_OUTPUT,
	CMD_SET_EEV
};

const int outputPinsCount = 3;
const int inputPinsCount = 5;

const int pwrOkPin = 12;

class GWHP: public i2c::hw::BufferedSlave {

	struct __attribute__ ((packed)) {
		unsigned char command;
		union {
			rgbLed::Setting rgbLed;
			struct __attribute__ ((packed)) {
				short fullSteps;
				unsigned char fast;
			} runEev;
			struct __attribute__ ((packed)) {
				unsigned char outputIndex;
				unsigned char state;
			} setOutput;
			struct __attribute__ ((packed)) {
				int position;
			} setEev;
		};
	} i2cRxBuffer;

	struct __attribute__ ((packed)) {
		unsigned char outputs;
		unsigned char inputs;
		int eevPosition;
	} i2cTxBuffer;

    rgbLed::Setting rgbSettings[2] = {{
		// power down 
        .rampUpTime = 5,
        .onTime = 0,
        .rampDownTime = 150,
        .offTime = 10,
		.rgb = { 255, 30, 100 }
	},{ 
		// power up
        .rampUpTime = 150,
        .onTime = 0,
        .rampDownTime = 5,
        .offTime = 10,
		.rgb = { 150, 255, 0 }
	}};


public:

	iwdg::Driver iwdg;

	rgbLed::Driver rgbLed;
	eev::Driver eev;

	outputPin::Driver outputPins[outputPinsCount];
	inputPin::Driver inputPins[inputPinsCount];

	inputPin::Driver* pwrOk;

	void init(int i2cAddress) {

		iwdg.init();

		outputPins[0].init(&target::GPIOA, 0, 0); // compressor relay
		outputPins[1].init(&target::GPIOA, 1, 0); // pump cold side
		outputPins[2].init(&target::GPIOA, 2, 0); // pump hot side

		inputPins[0].init(&target::GPIOA, 8, true, false); // EEV NFAULT
		inputPins[1].init(&target::GPIOA, 11, true, false); // I2C ALERT
		inputPins[2].init(&target::GPIOA, pwrOkPin, false, true); pwrOk = &inputPins[2]; // PWR OK		
		inputPins[3].init((volatile target::gpio_a::Peripheral*)&target::GPIOF, 0, false, true); // LPS
		inputPins[4].init((volatile target::gpio_a::Peripheral*)&target::GPIOF, 1, false, true); // HPS

		// EEV
		eev.init(&target::GPIOA, 3, 4, 5, 6, 7, &target::TIM17);

		bool isPwrOk = pwrOk->get();

		// RGB LED
		rgbLed.init(&target::GPIOB, 3, 1, 0, &target::TIM16, &rgbSettings[isPwrOk]);

		if (isPwrOk) {

			// I2C
			target::GPIOA.AFRH.setAFRH(9, 4);
			target::GPIOA.AFRH.setAFRH(10, 4);
			target::GPIOA.MODER.setMODER(9, 2);
			target::GPIOA.MODER.setMODER(10, 2);
			BufferedSlave::init(&target::I2C1, i2cAddress, (unsigned char*)&i2cRxBuffer, sizeof(i2cRxBuffer), (unsigned char*)&i2cTxBuffer, sizeof(i2cTxBuffer));

		} 

		eev.run(500, true);
	}

	virtual void onTxStart() {				                
		i2cTxBuffer.outputs = 0;
		for (int c = 0; c < outputPinsCount; c++) {
			i2cTxBuffer.outputs |= outputPins[c].get() << c;
		}
		i2cTxBuffer.inputs = 0;
		for (int c = 0; c < inputPinsCount; c++) {
			i2cTxBuffer.inputs |= inputPins[c].get() << c;
		}
		i2cTxBuffer.eevPosition = eev.getPosition();
	}

	virtual void onStop(bool read) {
		if (!read) {
			Command command = (Command) i2cRxBuffer.command;
			i2cRxBuffer.command = CMD_NONE;
			switch (command) {
				case CMD_I2C_SET_RGB_LED: {
					rgbLed.set(&i2cRxBuffer.rgbLed);
					break;
				}
				case CMD_RUN_EEV: {
					eev.run(i2cRxBuffer.runEev.fullSteps, i2cRxBuffer.runEev.fast);
					break;
				}
				case CMD_SET_OUTPUT: {
					if (i2cRxBuffer.setOutput.outputIndex < outputPinsCount) {
						outputPins[i2cRxBuffer.setOutput.outputIndex].set(i2cRxBuffer.setOutput.state);
					}					
					break;
				}
				case CMD_SET_EEV: {
					eev.setPosition(i2cRxBuffer.setEev.position);
					break;
				}
			}
		}
	}

	void handlePwrOkInterrupt() {		
		if (target::EXTI.PR.getPR(pwrOkPin)) {
			// reboot on both edges, no need to clear interrupt
			iwdg.reboot();
		}
	}

};

GWHP gwhp;

void interruptHandlerI2C1() {
	gwhp.handleInterrupt();
}

void interruptHandlerTIM16() {
	gwhp.rgbLed.handleInterrupt();
}

void interruptHandlerTIM17() {
	gwhp.eev.handleInterrupt();
}

void interruptHandlerEXTI4_15() {
	gwhp.handlePwrOkInterrupt();
}

void initApplication() {

	target::RCC.AHBENR.setIOPAEN(true);
	target::RCC.AHBENR.setIOPBEN(true);
	target::RCC.AHBENR.setIOPFEN(true);
	target::RCC.APB1ENR.setC_EN(1, 1);
	target::RCC.APB2ENR.setTIM16EN(1);
	target::RCC.APB2ENR.setTIM17EN(1);

	target::NVIC.ISER.setSETENA(1 << target::interrupts::External::I2C1);
	target::NVIC.ISER.setSETENA(1 << target::interrupts::External::TIM16);
	target::NVIC.ISER.setSETENA(1 << target::interrupts::External::TIM17);
	target::NVIC.ISER.setSETENA(1 << target::interrupts::External::EXTI4_15);

	target::SYSCFG.EXTICR4.setEXTI(pwrOkPin, 0);
	target::EXTI.IMR.setMR(pwrOkPin, 1);
	target::EXTI.FTSR.setTR(pwrOkPin, 1);
	target::EXTI.RTSR.setTR(pwrOkPin, 1);

	gwhp.init(0x74);

}
