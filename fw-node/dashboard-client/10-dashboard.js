wg.pages.home = {

    async render(container) {

        let registers = await wg.dashboard.getRegisters();

        let notifications = DIV("notifications").click(e => {
            notifications.hide();
        });

        function showNotification(message) {
            let notification = DIV("notification").text(message);
            notifications.append(notification).fadeIn();
            setTimeout(() => {
                notification.fadeOut(() => {
                    notification.remove();
                });
            }, 5000);
        }

        function setRegister(regName, value) {
            wg.dashboard.setRegister(regName, value).catch(e => {
                console.error(e);
                showNotification(e);
            });
        }

        function stopStartButtons(register) {
                return [
                    BUTTON().text("Start").click(e => setRegister(register, true)),
                    BUTTON().text("Stop").click(e => setRegister(register, false))
                ];
        }

        let controls = {
            compressorControl: stopStartButtons("compressorControl"),
            coldWaterPump: stopStartButtons("coldWaterPump"),
            hotWaterPump: stopStartButtons("hotWaterPump"),
            eevPosition: [INPUT("slider", {type: "range", id: "eevPosition", min: 0, max: 100})]
        }

        let systemErrors = DIV("system-errors");

        function updateSystemErrors(se) {
            systemErrors.empty().append(Object.entries(se).map(([key, message]) => DIV("system-error").text(message)));
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
                        register.value instanceof Object ?
                            register.value.key ?
                                register.value.key :
                                JSON.stringify(register.value) :
                            typeof register.value === "number" ?
                                register.value.toFixed(1) :
                                typeof register.value === "boolean" ?
                                    register.value ? "ON" : "OFF" :
                                    register.value === undefined ? "-" : register.value
                    ) + (register.unit ? " " + register.unit : "")
                )
                .toggleClass("goesDown", diff < 0)
                .toggleClass("goesUp", diff > 0)
                ;

            if (register.key === "compressorRamp" || register.key === "compressorRelay") {
                let alpha = registers.compressorRelay.value ? 1 : registers.compressorRamp.value / 100;
                $("#svg-compressor").css("fill", `rgb(0, 160, 100, ${alpha})`);
            }

            if (register.key === "eevPosition") {
                $("#eevPosition").val(register.value).change(e => {
                     setRegister("eevPosition", $(e.target).val());
                });
            }

        }

        function updateAllRegisters() {
            Object.values(registers).forEach(updateRegister);
        }

        container.append(
            notifications,
            SPAN("dashboard", [
                DIV("registers",
                    Object.values(registers)
                        .filter(register => register.key !== "systemErrors")
                        .map(register =>
                            SPAN("register", [
                                SPAN("name").text(register.name),
                                SPAN("value register-bound " + register.key),
                                SPAN("controls", controls[register.key])
                            ])
                        )
                ),
                systemErrors,
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
                .onRegisterChanged(cr => {
                    updateRegister(cr)
                })
                .onSystemErrorsChanged(se => {
                    updateSystemErrors(se);
                })
        );

        updateSystemErrors(await wg.dashboard.getSystemErrors());

        updateAllRegisters();
    }
}