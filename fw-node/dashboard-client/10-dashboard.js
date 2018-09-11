wg.pages.home = {
    
    async render(container) {

        let registers = await wg.dashboard.getRegisters();

        function updateRegister(register) {            
            registers[register.key]
            .el
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