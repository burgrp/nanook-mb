namespace outputPin {

class Driver {

    volatile target::gpio_a::Peripheral* port;
    int pin;

public:

    void init(
        volatile target::gpio_a::Peripheral* port, int pin, int value) {
        this->port = port;
        this->pin = pin;

        port->ODR.setODR(pin, value);
        port->MODER.setMODER(pin, 1);
    }

    void set(int value) {
        port->ODR.setODR(pin, value);
    }

    int get() {
        return port->IDR.getIDR(pin);
    }

};

}
