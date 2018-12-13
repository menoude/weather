
'use strict'

const { subscriptions } = require('./src/utils.js');
const Config = require('./src/config.js');
const Localisation = require('./src/localisation.js');
// const Intent = require('./src/intent.js');

// possible errors thrown here
const config = new Config('./config.ini');
const localisation = new Localisation(config);

localisation.loadPlaces();
console.log(localisation);

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost', {
    port: 1883
});

client.on('connect', () => {
    for (let topic in subscriptions) {
        client.subscribe(topic, (err) => console.log);
    }
});

// client.on('message', (topic, data) => {
//     let intent;

//     intent = new Intent(topic, data, localisation);
//     if (intent.skip)
//         return;
//     intent.buildAnswer().then((answer) => {
//         console.log('answer to publish: ');
//         console.log(answer);
//         client.publish(answer.endpoint, answer.payload);
//     });
// })