
#!/bin/bash

valid_tests[0]="what's the weather?";
valid_tests[1]="what will be the weather in 2 minutes?";
valid_tests[2]="what will be the weather in 2 hours?";
valid_tests[3]="what will be the weather tomorrow?";
valid_tests[4]="what's the weather for this week end?";
valid_tests[5]="what's the weather next week?";
valid_test_[6]="what will be the weather from now to tomorrow afternoon?";

invalid_tests[1]="what was the weather 5 minutes ago?";
invalid_tests[2]="what was the weather yesterday?";
invalid_tests[0]="what was the weather last week?";
invalid_tests[5]="what will be the weather in 2 weeks?"
invalid_tests[3]="what will be the weather in 3 months?";
invalid_tests[4]="what will be the weather next year?";

sub_topic="hermes/nlu/intentParsed";
pub_topic="hermes/nlu/query";

generate() {
    rm $1.txt &> /dev/null;
    if [ $1 = 'valid_tests' ]
    then
        tests=("${valid_tests[@]}");
        prefix='valid_test_';
    else
        tests=("${invalid_tests[@]}");
        prefix='invalid_test_';
    fi
    mosquitto_sub -t $sub_topic > $1.txt &
    pid=$!;
    sleep .1;
    for query in "${tests[@]}"
    do
        mosquitto_pub -t $pub_topic -m "{\"input\": \"$query\"}";
        sleep .2;
    done
    sleep .2;
    kill $pid &> /dev/null;
    csplit -f $prefix -n 1 -k ${1}.txt 1 {*} &> /dev/null;
    rm ${prefix}0 $1.txt;
    echo;
    tail -n +1 $prefix*;
    echo;
}

generate valid_tests;
generate invalid_tests;
