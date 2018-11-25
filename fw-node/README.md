# Raspi installation

```
docker run --name nanook --restart=always -d -p 81:8080 -v /data/nanook:/opt/app -e APP_DIR=/opt/app -e APP_START="./npg-start" -e REPOSITORY=https://github.com/burgrp/nanook.git burgrp/npg-rpi
```
