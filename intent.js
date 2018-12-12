'use strict'

const { subscriptions, hermes } = require('./utils.js');
const Localisation = require('./localisation.js');
import { timeFactory } from './time.js';
const Location = require('./location.js');
const Info = require('./info.js');
const Report = require('./report.js');
const Answer = require('./answer.js');

function Intent(topic, data, localisation) {
    this.name = subscriptions[topic];
    this.data = JSON.parse(data);
    this.skip = this.toSkip();
    if (this.skip)
        return ;
    this.sessionId = this.data.sessionId;
    this.localisation = localisation;
    console.log('---------------------------');
    console.log(`new intent for topic ${this.name}`);
    
    console.log('---------');
}

// returns an answer: checks that intent is worthy, sets the time, sets the location, fetches the data,
// processes the data with the location and the time to get a report, then builds an answer with respect to each intent
intent.prototype.buildAnswer = async function () {
    let time, location, info, report, answer;

    if (this.name === 'sessionEnded')
        return (this.buildError(this.data.termination.reason));
    time = this.timeFactory(this.data);
    try {
        time.checkRange();
    } catch (e) {
        return (this.buildError(this.localisation.errorMessages.timeRange));
        // make it a normal answer in order to have a session end!
    }
    location = new Location(this.data.slots);
    info = new Info(location);
    try {
        info = await info.fetchInfo();
    } catch (e) {
        console.log('Error with the API call');
        console.log(e);
        return (this.buildError(this.localisation.errorMessages.APICall));
    }
    report = new Report(this.name, location, time, info);
    answer = new Answer(this.localisation, this.sessionId, this.name, report);
    return (answer);
}

intent.prototype.toSkip = function () {
    return (this.name == 'sessionEnded' &&
        this.data.termination.reason == 'nominal');
};

intent.prototype.buildError = function (reason) {
    let answer = {};

    answer.endpoint = hermes.tts;
    answer.payload = JSON.stringify({
        text: this.localisation.errorMessages[reason],
        siteId: hermes.siteId
    });
    return (answer);
};

module.exports = Intent;