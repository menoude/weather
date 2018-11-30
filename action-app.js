'use strict'

const mqtt = require('mqtt');
const Server = require('server');

const hermes = {
    'hermes/dialogueManager/sessionEnded': 'sessionEnded',
    'hermes/intent/davidsnips:WeatherForecast': 'WeatherForecast',
    'hermes/intent/davidsnips:WeatherConditionRequest': 'WeatherConditionRequest',
    'hermes/intent/davidsnips:TemperatureForecast': 'TemperatureForecast',
}

const client = mqtt.connect('mqtt://localhost', {
    port: 1883
});


client.on('connect', () => {
    for (let topic in hermes) {
        client.subscribe(topic, (err) => console.log);
    }
});

client.on('message', (topic, data) => {
    let server,
        answer;

    server = new Server(topic, data);
    if (server.ignore()) {
        return ;
    }
    answer = server.getanswer();
    client.publish(answer.endpoint, answer.payload);
});