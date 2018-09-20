#!/usr/bin/env node

require("@device.farm/appglue")({require}).main(async app => {
    await app.controller.start();
    await app.web.start();
});