#!/bin/bash

git clone https://git.openwrt.org/openwrt/openwrt.git
cd openwrt
git checkout v18.06.1

./scripts/feeds update -a
./scripts/feeds install -a

echo "src-git node https://github.com/nxhack/openwrt-node-packages.git" >>feeds.conf.default
./scripts/feeds update node
rm ./package/feeds/packages/node
rm ./package/feeds/packages/node-*
./scripts/feeds install -a -p node

ln -s ../.config

