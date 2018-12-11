#!/bin/bash

valid_tests[0]="what's the weather?";
valid_tests[1]="what will be the weather in 2 minutes?";
valid_tests[2]="what will be the weather in 2 hours?";
valid_tests[3]="what will be the weather tomorrow?";
valid_tests[4]="what's the weather for this week end?";
valid_tests[5]="what's the weather for next week?";

invalid_tests[0]="what was the weather last week?";
invalid_tests[1]="what was the weather 5 minutes ago?";
invalid_tests[2]="what was the weather yesterday?";
invalid_tests[3]="what will be the weather in 2 months?";
invalid_tests[4]="what will be the weather next year?";

sub_topic="hermes/nlu/intentParsed";
pub_topic="hermes/nlu/query";

generate() {
    if [ $1 = 'valid_tests' ]
    then
        tests=$valid_tests;
    else
        tests=$invalid_tests;
    fi
    mosquitto_sub -t $sub_topic > $1.txt &
    pid=$!;
    sleep .1
    iterator=${tests[@]};
    echo "${iterator[@]}";
    for query in "$iterator"
    do
        mosquitto_pub -t $pub_topic -m "{\"input\": \"$query\"}"
        sleep .1
    done
    sleep .1
    kill $pid
    csplit -f valid -n 1 -k ${1}.txt 1 {*}
}

generate valid_tests;
generate invalid_tests;

