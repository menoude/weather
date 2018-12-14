'use strict'

const { subscriptions, hermes } = require('./utils.js');
const { timeFactory } = require('./time.js');
const Location = require('./location.js');
const Info = require('./info.js');
const Report = require('./report.js');
const Answer = require('./answer.js');

class Intent {
    
    constructor(topic, data, locale) {
        this.name = subscriptions[topic];
        this.data = JSON.parse(data);
        this.skip = this.toSkip();
        if (this.skip)
            return ;
        this.sessionId = this.data.sessionId;
        this.locale = locale;
        console.log('---------------------------');
        console.log(`new intent for topic ${this.name}`);
        
        console.log('---------');
    }
    
    // returns an answer: checks that intent is worthy, sets the time, sets the location, fetches the data,
    // processes the data with the location and the time to get a report, then builds an answer with respect to each intent
    async buildAnswer() {
        let time, location, info, report, answer;
        
        if (this.name === 'sessionEnded')
            throw new CustomError('', this.data.termination.reason, this.sessionId);
        time = timeFactory(this.data);
        try {
            time.checkRange();
        } catch (e) {
            throw new CustomError('', this.locale.errorMessages.timeRange, this.sessionId);
            // make it a normal answer in order to have a session end!
        }
        location = new Location(this.data.slots);
        info = new Info(config, location);
        try {
            info = await info.fetchInfo();
        } catch (e) {
            console.log('Error with the API call');
            console.log(e);
            throw new CustomError('', this.locale.errorMessages.APICall, this.sessionId);
        }
        // report = new Report(this.name, location, time, info);
        // answer = new Answer(this.locale, this.sessionId, this.name, report);
        // return (answer);
    }

    toSkip() {
        return (this.name == 'sessionEnded' &&
            this.data.termination.reason == 'nominal');
    }
}

module.exports = Intent;