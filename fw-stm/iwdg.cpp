namespace iwdg {
    
    class Driver: public genericTimer::Timer {

    public:

        void init() {
            start(10);
        }

        void onTimer() {
            //target:: ->MODER.setMODER(LED_PIN, 1);
    		start(10);
	    }

    };
}