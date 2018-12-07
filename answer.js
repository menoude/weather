'use strict'

const { hermes } = require('./utils.js');

function Answer(localisation, sessionId, intent, report) {
    this.localisation = localisation;
    this.report = report;
    this.reply = '';
    this.endpoint = hermes.endSession;
    this.buildSentance();
    this.payload = JSON.stringify({
        sessionId: sessionId,
        text: this.reply,
    });
    console.log(this);
    console.log('---------');
}

// in CITY this FUTUREDATE, the WEATHERCOND / FORECAST will be ABSOLUTE VALUE / INTERVALMINMAX
Answer.prototype.buildSentance = function() {
    if (this.report.time.future) {
        this.localisation.announcement = this.localisation.announcement.future;
        this.reply = `${this.report.time.formulation}, ${this.localisation.announcement.weatherCondition} ${this.localisation.conditions[this.report.condition]}`;
    }

};

module.exports = Answer;