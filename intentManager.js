
'use strict'

const { subscriptions, hermes } = require('./utils.js');
const Localisation = require('./localisation.js');
const { CurrentTime, FutureInterval, FutureInstant } = require('./time.js');
const Location = require('./location.js');
const Info = require('./info.js');
const Report = require('./report.js');
const Answer = require('./answer.js');

function intentManager(topic, data, localisation) {
    this.topic = subscriptions[topic];
    this.data = JSON.parse(data);
    this.skip = this.toSkip();
    if (this.skip)
        return ;
    this.sessionId = this.data.sessionId;
    this.localisation = localisation;
    console.log('---------------------------');
    console.log(`new intentManager for topic ${this.topic}`);
    
    console.log('---------');
}

// returns an answer: checks that intent is worthy, sets the time, sets the location, fetches the data,
// processes the data with the location and the time to get a report, then builds an answer with respect to each intent
intentManager.prototype.buildAnswer = async function () {
    let time, location, info, report, answer;

    if (this.topic === 'sessionEnded')
        return (this.buildError(this.data.termination.reason));
    time = this.buildTime();
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
    report = new Report(this.topic, location, time, info);
    answer = new Answer(this.localisation, this.sessionId, this.topic, report);
    return (answer);
}

intentManager.prototype.toSkip = function () {
    return (this.topic == 'sessionEnded' &&
        this.data.termination.reason == 'nominal');
};

intentManager.prototype.buildTime = function() {
    let slot, result;

    if (!this.data.slots) {
        result = new CurrentTime();
    } else {
        slot = this.data.slots.find((item) => item.slotName === 'forecast_datetime');
        if (!slot)
            result = new CurrentTime(slot);
        else if (slot.value.kind === 'InstantTime')
            result = new FutureInstant(slot);
        else if (slot.value.kind === 'TimeInterval')
            result = new FutureInterval(slot);
    }
    result.setTime();
    result.checkRange();
    return result;
};


intentManager.prototype.buildError = function (reason) {
    let answer = {};

    answer.endpoint = hermes.tts;
    answer.payload = JSON.stringify({
        text: this.localisation.errorMessages[reason],
        siteId: hermes.siteId
    });
    return (answer);
};

module.exports = intentManager