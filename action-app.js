'use strict'

const mqtt = require('mqtt');
const IntentManager = require('./intentManager.js');
const { subscriptions } = require('./utils.js');
const Localisation = require('./localisation.js');
const client = mqtt.connect('mqtt://localhost', {
    port: 1883
});

const localisation = new Localisation();

client.on('connect', () => {
    for (let topic in subscriptions) {
        client.subscribe(topic, (err) => console.log);
    }
});

client.on('message', (topic, data) => {
    let intentManager,
        answer;

    intentManager = new IntentManager(topic, data, localisation);
    answer = intentManager.buildAnswer().then((data) => {
        console.log(data);
        
    });
    console.log(answer);
    if (answer)
        client.publish(answer.endpoint, answer.payload);
});