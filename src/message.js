'use strict'

const { subscriptions } = require('./utils.js');

class Message {
    constructor(topic, data, locale) {
        this.topic = subscriptions[topic];
        this.data = JSON.parse(data);
        this.locale = locale;
        if (this.data.sessionId)
            this.sessionId = this.data.sessionId;
    }

    endNotice() {
        return (this.topic == 'sessionEnded' &&
                    this.data.termination.reason == 'nominal');
    }

    filterErrors() {
        if (this.topic === 'sessionEnded')
            throw new CustomError('', this.data.termination.reason, this.sessionId);
    }

    findPeriod() {
        return (this.data.slots.find((item) => {
            return (item.slotname === 'forecast_datetime');
        }));
    }

    findLocation() {
        return (this.data.slots.find((item) => {
            return (item.slotname === 'city' ||
                item.slotname === 'region' ||
                item.slotname === 'country');
        }));
    }
}

module.exports = Message;
