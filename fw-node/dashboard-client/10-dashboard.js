wg.pages.home = {
    
    async render(container) {

        let registers = await wg.dashboard.getRegisters();

        let notifications = DIV("notifications").hide().click(e => {
            notifications.hide();
        });

        function showNotification(message) {
            let notification = DIV("notification").text(message);
            notifications.append(notification).fadeIn();
            setTimeout(() => {
                notification.fadeOut(() => {
                    notification.remove();
                    if (!notifications.children().length) {
                        notifications.hide();
                    }
                });
            }, 5000);
        }

        function setRegister(regName, value) {
            wg.dashboard.setRegister(regName, value).catch(e => {
                console.error(e);
                showNotification(e);
            });
        }

        let controls = {
            compressorControl(controlContainer) {
                controlContainer.append([
                    BUTTON().text("Start").click(e => setRegister("compressorControl", true)),
                    BUTTON().text("Stop").click(e => setRegister("compressorControl", false))
                ]);
            }
        }

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
                        typeof register.value === "boolean"?
                        register.value? "ON": "OFF":
                        register.value === undefined? "-": register.value
                ) + (register.unit? " " + register.unit: "")
            )
            .toggleClass("goesDown", diff < 0)
            .toggleClass("goesUp", diff > 0)
            ;

            if (register.key === "compressorRamp" || register.key === "compressorRelay") {
                let alpha = registers.compressorRelay.value? 1: registers.compressorRamp.value / 100;
                $("#svg-compressor").css("fill", `rgb(0, 160, 100, ${alpha})`);
            }
        }

        function updateAllRegisters() {
            Object.values(registers).forEach(updateRegister);
        }

        container.append(
            notifications,
            SPAN("dashboard", [
                DIV("registers",
                    Object.values(registers).map(register => 
                        SPAN("register", [    
                            SPAN("name").text(register.name),
                            SPAN("value register-bound " + register.key),
                            SPAN("controls", controlsSpan => {
                                if (controls[register.key]) {
                                    controls[register.key](controlsSpan);
                                }
                            })
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