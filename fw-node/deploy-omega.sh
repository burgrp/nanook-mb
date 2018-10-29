#!/bin/bash

set -e

WORKDIR=/tmp/gwhp
TARGET=10.1.0.13

rm $WORKDIR/* -rf
mkdir -p $WORKDIR
cd $WORKDIR

npm install --no-optional @device.farm/gwhp

ssh root@$TARGET rm /gwhp -rf
scp -r node_modules root@$TARGET:/gwhp


