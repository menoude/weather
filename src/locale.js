'use strict'

const {
    errorMessages,
    conditions,
    presentAnnouncement,
    futureAnnouncement,
} = require('./utils.js');

class Locale {
    constructor(config) {
        this.errorMessages = errorMessages[config.locale];
        this.conditions = conditions[config.locale];
        this.presentAnnouncement = presentAnnouncement[config.locale];
        this.futureAnnouncement = futureAnnouncement[config.locale];
    }

    loadLanguage(config) {
        if (this.language != config.locale) {
            this.errorMessages = errorMessages[config.locale];
            this.conditions = conditions[config.locale];
            this.presentAnnouncement = presentAnnouncement[config.locale];
            this.futureAnnouncement = futureAnnouncement[config.locale];
        }
    }
}

module.exports = Locale