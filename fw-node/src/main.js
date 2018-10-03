#!/usr/bin/env node

require("@device.farm/appglue")({require, file: __dirname + "/../config.json"}).main(async app => {
    await app.controller.start();
    await app.web.start();
});
