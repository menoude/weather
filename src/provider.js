'use strict'

const CustomError = require('./customError.js');
const Moment = require('moment');
const axios = require('axios');

class Provider {
    constructor() {
        this.url = 'http://api.openweathermap.org/data/2.5/forecast';
        this.daysLimit = 5;
    }

    intersectPeriods(period) {
        let now, limit;

        now = new Moment();
        limit = new Moment().add(this.daysLimit, 'days');
        period.start = period.start.isAfter(now) ? period.start : now;
        period.end = period.end.isBefore(limit) ? period.end : limit;
        if (period.start.isAfter(period.end))
            throw new CustomError('', 'providerRange');
    }

    async fetch(config, location) {
        let request, response;

        request = `${url}?id=${location.id}&units=metric&APPID=${config.apiKey}`;
        try {
            response = await axios(request);
        } catch (err) {
            throw new CustomError(err.message, 'APICall');
        } finally {
            console.log(response);
        }
        
    }
    // keep the data that corresponds to the time period
    // trimInfo(period) {

    // }
}

module.exports = Provider;