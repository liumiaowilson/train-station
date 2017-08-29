#!/bin/bash
port=$1

ps aux | grep -v grep | grep -q "\-p $port"
if [[ $? -ne 0 ]]; then
    exit -1
else
    exit 0
fi
