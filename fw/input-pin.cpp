namespace inputPin {

class Driver {

    volatile target::gpio_a::Peripheral* port;
    int pin;
    bool logic;

public:

    void init(
        volatile target::gpio_a::Peripheral* port, int pin, bool pull, bool logic) {
        this->port = port;
        this->pin = pin;
        this->logic = logic;

        port->PUPDR.setPUPDR(pin, pull? 1: 0);
        port->MODER.setMODER(pin, 0);
    }

    int get() {
        return port->IDR.getIDR(pin) ^ !logic;
    }

};

}
