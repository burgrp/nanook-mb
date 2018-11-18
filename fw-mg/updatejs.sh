#!/bin/bash

set -e

#MOS="mos --port=mqtt://10.1.0.12/esp32_2453A8"

MOS="mos --port=/dev/ttyUSB0"

$MOS put fs/init.js
$MOS call Sys.Reboot
$MOS console