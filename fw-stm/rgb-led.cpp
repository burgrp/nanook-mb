namespace rgbLed {

struct Setting {
    unsigned char rampUpTime;
    unsigned char onTime;
    unsigned char rampDownTime;
    unsigned char offTime;
    unsigned char rgb[3];
};

class Driver {

    volatile target::gpio_b_f::Peripheral* port;
    int pins[3];
    int pwmCnt;
    int pwm[3];
    int stepPrescaler;
    int stepTimer;
    int stepEnd = 0xFF;
    int step;

    volatile target::tim_16_17::Peripheral* timer;

    Setting setting = { 
        .rampUpTime = 100,
        .onTime = 0,
        .rampDownTime = 10,
        .offTime = 10,
        .rgb = { 0, 255, 30 }
    };

public:
    void init(
        volatile target::gpio_b_f::Peripheral* port,
        int pinR,
        int pinG,
        int pinB,
        volatile target::tim_16_17::Peripheral* timer
    ) {
        this->port = port;
        this->pins[0] = pinR;
        this->pins[1] = pinG;
        this->pins[2] = pinB;
        this->timer = timer;

        for (int c = 0; c < sizeof(pins); c++) {
            port->MODER.setMODER(pins[c], 1);
        }

        timer->DIER.setUIE(1);
        timer->ARR.setARR(0x200);

        timer->CR1.setCEN(1);

        stepStart();
        update();
    }

    void update() {
        if (setting.rampUpTime == 0 && setting.onTime == 0 & setting.rampDownTime == 0 && setting.offTime == 0) {
            for (int c = 0; c < 3; c++) {
                pwm[c] = setting.rgb[c];
            }
        } else {
            int intensity = 0;        
            if (step == 0) {
                intensity = 0xFF * stepTimer / stepEnd;
            } else if (step == 1) {
                intensity = 0xFF;
            } else if (step == 2) {
                intensity = 0xFF - (0xFF * stepTimer / stepEnd);
            } 
            for (int c = 0; c < 3; c++) {
                pwm[c] = (setting.rgb[c] * (intensity + 1)) >> 8;
            }
        }
    }

    void stepStart() {
        if (step == 0) {
            stepEnd = setting.rampUpTime;
        } else if (step == 1) {
            stepEnd = setting.onTime;
        } else if (step == 2) {
            stepEnd = setting.rampDownTime;
        } else if (step == 3) {
            stepEnd = setting.offTime;
        } 
        if (stepEnd == 0) {
            stepEnd = 1;
        }
    }

    void handleInterrupt() {
        timer->SR.setUIF(0);
        pwmCnt = (pwmCnt + 1) & 0xFF;
        for (int c = 0; c < 3; c++) {
            port->ODR.setODR(pins[c], pwmCnt < pwm[c] || pwm[c] == 0xFF);
        } 
        stepPrescaler++;
        if (stepPrescaler == 250) {
            stepPrescaler = 0;
            stepTimer++;
            if (stepTimer == stepEnd) {
                stepTimer = 0;                
                step++;
                if (step == 5) {
                    step = 0;
                }
                stepStart();
            }
            update();
        }
    }

    void set(Setting* setting) {
        this->setting = *setting;
        update();
    }
};

}