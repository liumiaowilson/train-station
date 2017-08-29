#!/bin/bash
port=$1

ps aux | grep -v grep | grep -q "\-p $port"
if [[ $? -eq 0 ]]; then
    kill -9 `ps aux | grep "p $port" | grep -v grep | awk '{ print $2 }'`
fi
