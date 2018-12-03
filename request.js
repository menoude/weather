'use strict'

const { API } = require('./utils.js');

function Request(topic, data) {
    this.topic = topic;
    console.log('new request');
    
    console.log(data);
}

Request.prototype.sendRequest = function() {
    console.log('sending request');
};

module.exports = Request;