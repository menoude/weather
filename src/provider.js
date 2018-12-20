'use strict'

const CustomError = require('./customError.js');
const axios = require('axios');

class Provider {
    constructor() {
        this.url = 'http://api.openweathermap.org/data/2.5/forecast';
        this.daysLimit = 5;
    }

    intersectPeriods(period) {
        let providerStart, providerEnd;

        providerStart = new Date();
        providerEnd = new Date();
        providerEnd.setDate(end.getDate() + 5);
        period.start = period.start >= providerStart ? period.start : providerStart;
        period.end = period.end <= providerEnd ? period.end : providerEnd;
        if (period.start > period.end)
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