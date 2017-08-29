#!/bin/bash
cwd="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
configFile=$cwd/config.ini
logFile=$cwd/servers.log

if ! type lt > /dev/null 2>&1; then
    echo "Local tunnel should be installed."
    exit -1
fi

cat /dev/null > $logFile

while read p; do
    name=${p%=*}
    port=${p#*=}
    if [[ -e $cwd/$name/stop.sh ]];then
        $cwd/stop_one.sh $port $name 2>&1 >> $logFile &
    fi
done < $configFile
