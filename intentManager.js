'use strict'

const {
    subscriptions,
    hermes,
} = require('./utils.js');
const Localisation = require('./localisation.js');
const Time = require('./time.js');
const Location = require('./location.js');
const Info = require('./info.js');
const Report = require('./report.js');
const Answer = require('./answer.js');

function intentManager(topic, data, localisation) {
    this.topic = subscriptions[topic];
    this.data = JSON.parse(data);
    this.localisation = localisation;
    console.log(this);
    console.log('---------');
}

// returns an answer: checks that intent is worthy, sets the time, sets the location, fetches the data,
// processes the data with the location and the time to get a report, then builds an answer with respect to each intent
intentManager.prototype.buildAnswer = async function () {
    let time, location, info, report, answer;

    if (this.toIgnore())
        return ({});
    else if (this.topic === 'sessionEnded') {
        return (this.buildError(this.data.termination.reason));
    }
    this.sessionId = this.data.sessionId;
    try {
        time = new Time(this.data);
    } catch (e) {
        console.log('Error with the time range');
        console.log(e);
        return (this.buildError(this.localisation.errorMessages.timeRange));
    }
    location = new Location(this.data);
    info = new Info(location);
    try {
        info = await info.fetchInfo();
    } catch (e) {
        console.log('Error with the API call');
        console.log(e);
        return (this.buildError(this.localisation.errorMessages.APICall));
    }
    report = new Report(this.topic, location, time, info);
    answer = new Answer(this.localisation, this. sessionId, this.topic, report);
    answer.payload = JSON.stringify(answer.payload);
    return (answer);
}

intentManager.prototype.toIgnore = function () {
    return (this.topic == subscriptions.sessionEnded &&
        this.data.termination.reason == 'nominal');
}

intentManager.prototype.buildError = function (reason) {
    let answer = {};

    answer.endpoint = hermes.tts;
    answer.payload = JSON.stringify({
        text: this.localisation.errorMessages[reason],
        siteId: hermes.siteId
    });
    return (answer);
};

module.exports = intentManager;