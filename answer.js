'use strict'

const { hermes } = require('./utils.js');

function Answer(localisation, sessionId, intent, report) {
    this.endpoint = hermes.endSession;
    this.payload = {
        sessionId: sessionId,
        text: localisation.defaultAnswers.sun,
    };
    console.log(this);
    console.log('---------');
}

module.exports = Answer;