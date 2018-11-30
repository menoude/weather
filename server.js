'use strict'

const {
    subscriptions,
    hermes,
    sessionEndMessages
} = require('./utils.js');

function Server(topic, data) {
    this.topic = subscriptions[topic];
    this.data = JSON.parse(data);
    this.message = null;
    this.answerMessage = null;
    this.endReason = null;
    this.sessionId = null;
    this.slots = null;
}

Server.prototype.ignore = function () {
    return (this.topic == subscriptions.sessionEnded &&
        this.data.termination.reason == 'nominal');
}

Server.prototype.buildAnswer = function () {
    if (this.topic == 'sessionEnded') {
        console.log('session ended');
        return ({
            endpoint: hermes.ttsEndpoint,
            payload: JSON.stringify({
                text: sessionEndMessages[this.data.termination.reason],
                siteId: hermes.siteId
            })
        });
    } else {
        console.log(`recognized ${this.topic}`);
    }
}

module.exports = Server;