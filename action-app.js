
'use strict'

const { subscriptions } = require('./src/utils.js');
const CustomError = require('./src/customError.js');
const Config = require('./src/config.js');
const Locale = require('./src/locale.js');
const Places = require('./src/places.js');
const Intent = require('./src/intent.js');
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost', {
    port: 1883
});

const locale = new Locale();
const places = new Places();
const config = new Config(locale, places);

client.on('connect', () => {
    try {
        config.parseConfig('./config.ini');
        locale.loadConfig(config);
        places.loadPlaces(locale);
        for (let topic in subscriptions) {
            client.subscribe(topic, (err) => {
                if (err)
                    throw new CustomError(err, 'mqtt');
            });
        }
    } catch (err) {
        err.formulate(locale);
        console.log(err);
        client.publish(err.endpoint, err.payload);
        process.exit(1);
    }
});

client.on('message', (topic, data) => {
    let intent;

    try {
        intent = new Intent(topic, data, locale);
        if (intent.skip)
            return;
        intent.buildAnswer().then((answer) => {
            console.log(answer);
            client.publish(answer.endpoint, answer.payload);
        });
    } catch (err) {
        console.log(err);
        err.formulate(locale);
        console.log(err);
        client.publish(err.endpoint, err.payload);
    }
})