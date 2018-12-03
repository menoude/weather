'use strict'

const {
    subscriptions,
    hermes,
    sessionEndMessages
} = require('./utils.js');
const Request = require('./request.js');
const Report = require('./report.js');

function Server(topic, data) {
    this.topic = subscriptions[topic];
    this.data = JSON.parse(data);
}

Server.prototype.buildAnswer = async function () {
    let request, report;

    if (this.topic == 'sessionEnded') {
        return (this.buildError());
    }
    request = new Request(this.topic, this.data);
    await request.sendRequest();
    report = new Report(request);
    return (report.buildReport());
}

Server.prototype.ignore = function () {
    return (this.topic == subscriptions.sessionEnded &&
        this.data.termination.reason == 'nominal');
}

Server.prototype.buildError = function () {
    let answer = {};

    console.log('send error');
    answer.endpoint = hermes.ttsEndpoint;
    answer.payload = JSON.stringify({
        text: sessionEndMessages[this.data.termination.reason],
        siteId: hermes.siteId
    });
    return (answer);
};

module.exports = Server;