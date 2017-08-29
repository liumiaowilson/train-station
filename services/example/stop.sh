#!/bin/bash
port=$1

kill -9 `ps aux | grep "p $port" | grep -v grep | awk '{ print $2 }'`
