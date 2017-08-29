#!/bin/bash
port=$1
name=$2
cwd="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [[ "$port" == "" ]];then
    echo "Port is required."
    exit -1
fi

if [[ "$name" == "" ]];then
    echo "Name is required."
    exit -1
fi

if ! type lt > /dev/null 2>&1; then
    echo "Local tunnel should be installed."
    exit -1
fi

ps aux | grep -v grep | grep -q "lt \--port $port"
if [[ $? -eq 0 ]];then
    kill -9 `ps aux | grep "lt \--port $port" | grep -v grep | awk '{ print $2 }'`
fi

$cwd/$name/status.sh $port
if [[ $? -eq 0 ]]; then
    $cwd/$name/stop.sh $port
fi

echo "[$name] Stopped"
