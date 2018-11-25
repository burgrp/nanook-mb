# Raspi installation

```
docker run --name nanook --restart=always -d -p 81:8080 -v /data/nanook:/opt/app -e APP_DIR=/opt/app/app -e APP_START="cd fw-node;node src/main.js" -e DATA_DIR=/opt/app/data -e MQTT=10.1.0.12 -e I2C_BUS=mg:http://10.1.0.13/rpc -e REPOSITORY=https://github.com/burgrp/nanook.git burgrp/npg-rpi
```