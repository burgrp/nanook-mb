wg.pages.home = {
    
    async render(container) {

        let registers = await wg.dashboard.getRegisters();

        function updateRegister(register) {
            let el = registers[register.key].el;
            
            if (typeof register.value === "number") {
                register.value = Math.round(register.value * 10) / 10;
                let diff = register.value - registers[register.key].value;
                el.toggleClass("goesDown", diff < 0);
                el.toggleClass("goesUp", diff > 0);
            }

            registers[register.key].value = register.value;            

            el
            .find(".number")
            .text(
                register.value instanceof Object? 
                    register.value.key? 
                        register.value.key: 
                        JSON.stringify(register.value): 
                    typeof register.value === "number"?
                        register.value.toFixed(1):
                        register.value
                );
        }

        container.append(
            SPAN("registers",
                Object.values(registers).map(register => 
                    SPAN("register", [    
                        SPAN("name").text(register.name),
                        SPAN("value", [
                            SPAN("number"),
                            SPAN("unit").text(register.unit)
                        ])
                    ], span => {
                        register.el = span;
                        updateRegister(register);
                    })
                )                
            ).onRegisterChanged(cr => {
                updateRegister(cr)
            })
        )
    }
}