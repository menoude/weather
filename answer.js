'use strict'

import { hermes } from './utils.js';

export class Answer {
    
    constructor(localisation, sessionId, intent, report) {
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
    
    buildSentance() {
        if (this.report.time.future) {
            this.localisation.announcement = this.localisation.announcement.future;
            this.reply = `${this.report.time.formulation}, ${this.localisation.announcement.weatherCondition} ${this.localisation.conditions[this.report.condition]}`;
        }
    
    }
}