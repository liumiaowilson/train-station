#!/bin/bash
port=$1
name=$2
cwd="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
urlFile=$cwd/$name/url.out

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
    $cwd/$name/start.sh $port
fi

echo "[$name] Inactive => Waiting"

ps aux | grep -v grep | grep -q "lt \--port $port"
if [[ $? -ne 0 ]];then
    if [[ -e $urlFile ]];then
        rm $urlFile
    fi

    (nohup lt --port $port > $urlFile 2>&1 &) > /dev/null

    while [ ! -s $urlFile ]
    do
        sleep 1
    done

    url=`cat $urlFile | awk -F': ' '{ print $2 }'`
    echo $url > $urlFile
fi

echo "[$name] Waiting => Active"

echo "[$name] Registered at "`cat $urlFile`
