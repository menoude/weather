'use strict'

const { subscriptions } = require('./utils.js');
const IntentManager = require('./intentManager.js');
const Localisation = require('./localisation.js');
const localisation = new Localisation();

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost', {
    port: 1883
});

client.on('connect', () => {
    for (let topic in subscriptions) {
        client.subscribe(topic, (err) => console.log);
    }
});

client.on('message', (topic, data) => {
    let intentManager;

    intentManager = new IntentManager(topic, data, localisation);
    if (intentManager.skip)
        return;
    intentManager.buildAnswer().then((answer) => {
        console.log('answer to publish: ');
        console.log(answer);
        client.publish(answer.endpoint, answer.payload);
    });
});