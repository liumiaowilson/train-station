#!/bin/bash
port=$1
cwd="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
logFile=$cwd/server.log

nohup http-server $cwd -p $port > $logFile 2>&1 &
