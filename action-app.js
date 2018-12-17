
'use strict'

const { subscriptions } = require('./src/utils.js');
const CustomError = require('./src/customError.js');
const Config = require('./src/config.js');
const Locale = require('./src/locale.js');
const Places = require('./src/places.js');
const Message = require('./src/message.js');
const Intent = require('./src/intent.js');

const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost', {
    port: 1883
});

const locale = new Locale();
const places = new Places();
const config = new Config(locale, places);

// sets up config, locale and locations database
// when encountering an error, gives feedback through tts and exits
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
        setTimeout(() => process.exit(1), 50);
    }
});

client.on('message', (topic, data) => {
    let message, intent, report;

    message = new Message(topic, data);
    if (message.endNotice())
        return ;
    try {
        message.filterErrors();
        intent = new Intent(message);
        intent.setPeriod();
        intent.setLocation();
        report = new Report(intent);
        report.fetchInfo().then(() => {
            report.trim();
            console.log(report);
            
        });

    } catch (err) {
        console.log(err);
        err.formulate(locale);
        console.log(err);
        client.publish(err.endpoint, err.payload);
    }
})


// // returns an answer: checks that intent is worthy, sets the time, sets the location, fetches the data,
//     // processes the data with the location and the time to get a report, then builds an answer with respect to each intent
//     async buildAnswer() {
//         let time, location, info, report, answer;

//         time = timeFactory(this.data);
//         try {
//             time.checkRange();
//         } catch (e) {
//             throw new CustomError('', this.locale.errorMessages.timeRange, this.sessionId);
//             // make it a normal answer in order to have a session end!
//         }
//         location = new Location(this.data.slots);
//         info = new Info(config, location);
//         try {
//             info = await info.fetchInfo();
//         } catch (e) {
//             console.log('Error with the API call');
//             console.log(e);
//             throw new CustomError('', this.locale.errorMessages.APICall, this.sessionId);
//         }
//         // report = new Report(this.name, location, time, info);
//         // answer = new Answer(this.locale, this.sessionId, this.name, report);
//         // return (answer);
//     }