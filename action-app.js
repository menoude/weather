'use strict'

const { subscriptions } = require('./utils.js');
const Intent = require('./intent.js');
const Localisation = require('./localisation.js');
const mqtt = require('mqtt');

const localisation = new Localisation();
const client = mqtt.connect('mqtt://localhost', {
    port: 1883
});

client.on('connect', () => {
    for (let topic in subscriptions) {
        client.subscribe(topic, (err) => console.log);
    }
});

client.on('message', (topic, data) => {
    let intent;

    intent = new Intent(topic, data, localisation);
    if (intent.skip)
        return;
    intent.buildAnswer().then((answer) => {
        console.log('answer to publish: ');
        console.log(answer);
        client.publish(answer.endpoint, answer.payload);
    });
});