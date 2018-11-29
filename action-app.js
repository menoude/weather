'use strict'

const mqtt = require('mqtt');

const client  = mqtt.connect('mqtt://localhost', { port: 1883 });

client.on('connect', () => {
    client.subscribe('hermes/hotword/default/detected', (err) => console.log);
    client.subscribe('hermes/dialogueManager/sessionEnded', (err) => console.log);
    client.subscribe('hermes/intent/default/detected', (err) => console.log);
    client.subscribe('hermes/intent/default/detected', (err) => console.log);
    client.subscribe('hermes/intent/default/detected', (err) => console.log);
    client.subscribe('hermes/intent/default/detected', (err) => console.log);
    
});

client.on('message', (topic, data) {
    
});