wg.pages.home = {
    
    async render(container) {

        let registers = await wg.dashboard.getRegisters();

        function updateRegister(register) {
            
            let diff;

            if (typeof register.value === "number") {
                register.value = Math.round(register.value * 10) / 10;
                diff = register.value - registers[register.key].value;
            }

            registers[register.key].value = register.value;            

            $(".register-bound." + register.key)
            .text(
                (
                register.value instanceof Object? 
                    register.value.key? 
                        register.value.key: 
                        JSON.stringify(register.value): 
                    typeof register.value === "number"?
                        register.value.toFixed(1):
                        register.value === undefined? "-": register.value
                ) + (register.unit? " " + register.unit: "")
            )
            .toggleClass("goesDown", diff < 0)
            .toggleClass("goesUp", diff > 0)
            ;
        }

        function updateAllRegisters() {
            Object.values(registers).forEach(updateRegister);
        }

        container.append(
            SPAN("dashboard", [
                DIV("registers",
                    Object.values(registers).map(register => 
                        SPAN("register", [    
                            SPAN("name").text(register.name),
                            SPAN("value register-bound " + register.key)
                        ])
                    )                
                ).onRegisterChanged(cr => {
                    updateRegister(cr)
                }),
                DIV("schema", span => {
                    $.get("schema.svg", svg => {
                        let svgStr = (new window.XMLSerializer()).serializeToString(svg);
                        span.html(svgStr);
                        span.find("tspan").each((i, tspan) => {
                            tspan = $(tspan);
                            let key = tspan.text();
                            if (key.startsWith("$")) {
                                key = key.substring(1);
                                tspan.addClass("register-bound " + key);
                            }
                        });
                        updateAllRegisters();
                    });                    
                })
            ])
        );

        updateAllRegisters();
    }
}