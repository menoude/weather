'use strict'

const axios = require('axios');

const url = 'http://api.openweathermap.org/data/2.5/forecast';

class Info() {
    
    constructor(config, location) {
        this.request = `${url}?id=${location.id}&units=metric&APPID=${config.apiKey}`;
        console.log(this);
    }
    
    async fetchInfo() {
        let response;
    
        console.log('sending request');
        response = await axios(this.request);
        // console.log(response);
        console.log('---------');
        return (response);
    }
}

module.exports = Info;