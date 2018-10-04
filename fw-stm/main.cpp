const int VALUE_UNKNOWN = -1;

enum Command {
	CMD_NONE,
	CMD_I2C_SET_RGB_LED,
	CMD_RUN_EEV,
	CMD_SET_OUTPUT
};

const int outputPinsCount = 3;
const int inputPinsCount = 5;

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

		};
	} i2cRxBuffer;

	struct __attribute__ ((packed)) {
		unsigned char outputs;
		unsigned char inputs;
		int eevPosition;
	} i2cTxBuffer;

public:

	rgbLed::Driver rgbLed;
	eev::Driver eev;

	outputPin::Driver outputPins[outputPinsCount];
	inputPin::Driver inputPins[inputPinsCount];

	void init(int i2cAddress) {

		// RGB LED
		rgbLed.init(&target::GPIOB, 3, 1, 0, &target::TIM16);

		// EEV
		eev.init(&target::GPIOA, 3, 4, 5, 6, 7, &target::TIM17);

		outputPins[0].init(&target::GPIOA, 0, 0); // compressor relay
		outputPins[1].init(&target::GPIOA, 1, 0); // pump cold side
		outputPins[2].init(&target::GPIOA, 2, 0); // pump hot side

		inputPins[0].init(&target::GPIOA, 8, true, false); // EEV NFAULT
		inputPins[1].init(&target::GPIOA, 11, true, false); // I2C ALERT
		inputPins[2].init(&target::GPIOA, 12, false, true); // PWR OK
		inputPins[3].init((volatile target::gpio_a::Peripheral*)&target::GPIOF, 0, false, true); // LPS
		inputPins[4].init((volatile target::gpio_a::Peripheral*)&target::GPIOF, 1, false, true); // HPS

		// I2C
		target::GPIOA.AFRH.setAFRH(9, 4);
		target::GPIOA.AFRH.setAFRH(10, 4);
		target::GPIOA.MODER.setMODER(9, 2);
		target::GPIOA.MODER.setMODER(10, 2);
		BufferedSlave::init(&target::I2C1, i2cAddress, (unsigned char*)&i2cRxBuffer, sizeof(i2cRxBuffer), (unsigned char*)&i2cTxBuffer, sizeof(i2cTxBuffer));
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
			}
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

	gwhp.init(0x73);

}
