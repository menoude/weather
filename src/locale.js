'use strict'

const {
    errorMessages,
    conditions,
    presentAnnouncement,
    futureAnnouncement,
} = require('./utils.js');

class Locale {
    constructor(config) {
        this.language = 'english';
        this.errorMessages = errorMessages['english'];
        this.conditions = conditions[this.language];
        this.presentAnnouncement = presentAnnouncement[this.language];
        this.futureAnnouncement = futureAnnouncement[this.language];
    }

    loadConfig(config) {
        if (this.language != config.locale) {
            this.language = config.locale;
            this.errorMessages = errorMessages[this.language];
            this.conditions = conditions[this.language];
            this.presentAnnouncement = presentAnnouncement[this.language];
            this.futureAnnouncement = futureAnnouncement[this.language];
        }
    }
}

module.exports = Locale