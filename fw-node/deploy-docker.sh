#!/bin/bash

set -e

APP=gwhp
IMG=burgrp/$APP
DOCKER="ssh root@df.local docker"

docker build -t $IMG .
docker push $IMG

set +e

$DOCKER stop $APP
$DOCKER rm $APP

set -e

$DOCKER pull $IMG
$DOCKER run --name $APP -p 81:81 -p 9201:9201 -v /data/gwhp/env:/gwhp/env --restart=always $IMG