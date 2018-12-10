#!/bin/sh
for file in ./*.json
do 
    mosquitto_pub -t 'hermes/intent/davidsnips:WeatherForecast' -f $file;
    sleep .1;
done