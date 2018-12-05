'use strict'

const fetch = 
const API = {
    key: '86b50369b1aeedddf798aa6993a45bc7',
    url: 'http://api.openweathermap.org/data/2.5/forecast'
};

function Info(location) {
    this.request = `${API.url}?q=${location.id}&units=metric&APPID=${API.key}`;
    console.log('new request');
}

Info.prototype.fetchInfo = async function() {
    let response;

    console.log('sending request');
    response = await fetch(this.request);
    response = await response.json();
    return (response);
};

module.exports = Info;