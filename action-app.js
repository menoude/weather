'use strict'

const mqtt = require('mqtt');

const sessionEndMessages = {
    'abortedByUser': 'Sorry, there was an error.',
    'intentNotRecognized': 'Sorry, I did not understand your request.',
    'timeout': 'Sorry, your session timed out.',
    'error': 'Sorry, there was an error.'
}

const client  = mqtt.connect('mqtt://localhost', { port: 1883 });

client.on('connect', () => {
    for (let topic in hermes) {
        client.subscribe(topic, (err) => console.log);
    }
});

client.on('message', (topic, data) => {
    let router = new Router(topic, data);

    
    if (!message)
        console.log('unknown message');
    else if (message == 'hotword') {
        console.log('hotword detected');
        console.log(data);
    }
    if (message == 'sessionEnd') {
        console.log('session ended');
        endReason = data.termination.reason;
        answer.payload = sessionEndMessages[endReason];
        client.publish('hermes/dialogueManager/endSession', answer.toString());
        console.log(data);
    } else {
        console.log(`recognized ${message}`);
    }    
});