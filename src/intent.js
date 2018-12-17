'use strict'

const {
    subscriptions,
    hermes
} = require('./utils.js');
const Period = require('./period.js');
const Location = require('./location.js');

class Intent {

    constructor(message) {
        this.type = message.topic;
        this.locale = message.locale;
        console.log('---------------------------');
        console.log(`new intent ${this.type}`);
        console.log('---------');
    }
    
    setPeriod() {
        let periodSlot, period;

        periodSlot = this.data.slots.find((item) => {
            return (item.slotname === 'forecast_datetime');
        });
        period = new Period();
        if (periodSlot)
            period.setFromSlot(periodSlot);
        this.period = period;
    }

    setLocation() {
        let locationSlot, location;


        locationSlot = this.data.slots.find((item) => {
            return (item.slotname === 'city' ||
                item.slotname === 'region' ||
                item.slotname === 'country');
        });
        location = new Location();
        if (locationSlot)
            location.setFromSlot(locationSlot);
        this.location = location;
    }

}

module.exports = Intent;