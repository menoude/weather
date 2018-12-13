'use strict'

import 'axios';

const API = {
    key: '86b50369b1aeedddf798aa6993a45bc7',
    url: 'http://api.openweathermap.org/data/2.5/forecast'
};

export class Info() {
    
    constructor(location) {
        this.request = `${API.url}?id=${location.id}&units=metric&APPID=${API.key}`;
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