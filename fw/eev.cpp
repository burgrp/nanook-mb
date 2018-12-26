namespace eev {

const unsigned char phases[4] = {
    0b0001,
    0b0100,
    0b0010,
    0b1000
};

class Driver {

    volatile target::gpio_a::Peripheral* port;
    int pins[4];
    int pinNSleep;
    volatile target::tim_16_17::Peripheral* timer;

public:
    int counter;
    int stop;

    void init(
        volatile target::gpio_a::Peripheral* port,
        int pinA1,
        int pinA2,
        int pinB1,
        int pinB2,
        int pinNSleep,
        volatile target::tim_16_17::Peripheral* timer
    ) {
        this->port = port;
        this->pins[0] = pinA1;
        this->pins[1] = pinA2;
        this->pins[2] = pinB1;
        this->pins[3] = pinB2;
        this->pinNSleep = pinNSleep;
        this->timer = timer;

        for (int p = 0; p < 4; p++) {
            port->ODR.setODR(pins[p], 0);
            port->MODER.setMODER(pins[p], 1);
        }

        port->ODR.setODR(pinNSleep, 0);
        port->MODER.setMODER(pinNSleep, 1);

        timer->DIER.setUIE(1);
        
        timer->ARR.setARR(0);
        timer->PSC.setPSC(0);

        timer->CR1.setCEN(1);
    }

    void run(int fullSteps, bool fast) {
        timer->PSC.setPSC(fast? 1: 3); // 3=50Hz, 1=150Hz
        timer->ARR.setARR(53333);
        stop = counter + fullSteps;
    }

    int getPosition() {
        return counter;
    }

    void setPosition(int position) {
        counter = position;
        stop = position;
    }

    void handleInterrupt() {
        timer->SR.setUIF(0);

        int bssr[2] = {0, 0};
        for (int p = 0; p < 4; p++) {
            bssr[(phases[counter & (sizeof(phases) - 1)] >> p) & 1] |= 1 << pins[p];
        }
        port->BSRR = bssr[1] | bssr[0] << 16;
        port->ODR.setODR(pinNSleep, counter != stop);

        if (counter < stop) {
            counter++;
        } else if (counter > stop) {
            counter--;
        } else {
            timer->ARR.setARR(0);
            timer->PSC.setPSC(0);
        }
    }

};

}
