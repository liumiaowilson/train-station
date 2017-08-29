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

$cwd/$name/status.sh $port
if [[ $? -ne 0 ]]; then
    echo "Inactive"
    exit 0
fi

ps aux | grep -v grep | grep -q "lt \--port $port"
if [[ $? -ne 0 ]];then
    echo "Waiting"
    exit 0
else
    echo "Active"
    exit 0
fi
