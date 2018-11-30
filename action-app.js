'use strict'

const mqtt = require('mqtt');
const Server = require('./server.js');
const { subscriptions } = require('./utils.js');

const client = mqtt.connect('mqtt://localhost', {
    port: 1883
});


client.on('connect', () => {
    for (let topic in subscriptions) {
        client.subscribe(topic, (err) => console.log);
    }
});

client.on('message', (topic, data) => {
    let server,
        answer;

    server = new Server(topic, data);
    console.log(server.data);
    console.log(server.topic);
    
    if (server.ignore()) {
        return ;
    }
    answer = server.buildAnswer();
    console.log(answer);
    client.publish(answer.endpoint, answer.payload);
});