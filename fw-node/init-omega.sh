#!/bin/bash

set -e

WIFI_SSID=416P
WIFI_PASSWORD=ferdamravenec
HOST_NAME=hp

DEFAULT_AP_IP=192.168.3.1

ssh-keygen -R $DEFAULT_AP_IP

echo "Make sure you are connected to your Omega-XXXX access point"

NEW_AP_PASSWORD=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | head -c 8)
echo "Please record new AP hidden SSID: '${HOST_NAME}' and password: '$NEW_AP_PASSWORD'"
echo "When prompted for password, enter 'onioneer' to login to Omega2 and install your SSH key"

scp ~/.ssh/id_rsa.pub root@$DEFAULT_AP_IP:/etc/dropbear/authorized_keys

ssh root@$DEFAULT_AP_IP <<EOF

uci set system.@system[0].hostname=$HOST_NAME

uci set wireless.ap.key=$NEW_AP_PASSWORD
uci set wireless.ap.hidden=1
uci set wireless.ap.ssid=$HOST_NAME

uci commit
reload_config

opkg remove uhttpd-mod-ubus uhttpd

sh -c "wifisetup add -ssid $WIFI_SSID -encr psk2 -password $WIFI_PASSWORD ; sleep 10; reboot" &

EOF

set +e

while [ 1 == 1 ]
do
    echo "Waiting for $HOST_NAME.local to appear on network..."
    ping -c 1 $HOST_NAME.local
    if [ $? == 0 ] 
    then
        break
    fi
done

set -e

ssh-keygen -f "/home/paul/.ssh/known_hosts" -R $HOST_NAME.local
ssh root@$HOST_NAME.local <<EOF
opkg update
opkg install mc
EOF
