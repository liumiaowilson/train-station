#!/bin/bash
cwd="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
configFile=$cwd/config.ini

if ! type lt > /dev/null 2>&1; then
    echo "Local tunnel should be installed."
    exit -1
fi

while read p; do
    name=${p%=*}
    port=${p#*=}
    if [[ -e $cwd/$name/status.sh ]];then
        echo $name=`$cwd/status_one.sh $port $name`=`cat $cwd/$name/url.out`
    fi
done < $configFile
