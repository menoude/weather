#!/usr/bin/node
'use strict'

const {
    subscriptions
} = require('./src/utils.js');
const CustomError = require('./src/customError.js');
const Config = require('./src/config.js');
const Locale = require('./src/locale.js');
const Places = require('./src/places.js');
const Message = require('./src/message.js');
// const Period = require('./src/period.js');
const Location = require('./src/location.js');
// const Report = require('./src/report.js');

const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost', {
    port: 1883
});

const locale = new Locale();
const places = new Places();
const config = new Config(locale);

// sets up config, locale and locations database
// when encountering an error, gives feedback through tts and exits
client.on('connect', () => {
    try {
        config.parseConfig('./config.ini');
        locale.loadConfig(config);
        places.loadData(locale);
        places.setDefaultLocation(places.lookUp(config.defaultLocation));
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
        setTimeout(() => process.exit(1), 50);
    }
});

client.on('message', (topic, data) => {
    handle(topic, data);
})

async function handle(topic, data) {
    let message, period, location, report;

    message = new Message(topic, data, locale, config);
    if (message.endNotice())
        return;
    try {
        message.filterErrors();
        // period = new Period();
        location = new Location(places);
        // period.setFromSlot(message.findPeriod());
        location.setFromSlot(places, message.findLocation());
        // report = new Report(period, location);
        // await report.fetchInfo();
        // report.trim();
        console.log(location);

    } catch (err) {
        console.log(err);
        err.formulate(locale);
        console.log(err);
        client.publish(err.endpoint, err.payload);
    }
}