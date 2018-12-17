'use strict'

const { placesData } = require('./utils.js');
const { readFileSync } = require('fs');
const CustomError = require('./customError.js');

class Places {

    constructor() {
        this.city = {
            "New York City": {
                "geonameid": "5128581", 
                "value": "New York City", 
                "population": 8175133
            }
        }
        this.region = {
            "California": {
                "geonameid": "5332921", 
                "country": "US", 
                "value": "California", 
                "population": 37691912
            },
        }
        this.country = {
            "United States": {
                "geonameid": "6252001", 
                "value": "United States", 
                "population": 310232863
            }
        }
    }

    loadPlaces(locale) {
        let path;

        path = placesData[locale.language];
        try {
            this.city = JSON.parse(readFileSync(`${path}/city.json`));
            this.region = JSON.parse(readFileSync(`${path}/region.json`));
            this.country = JSON.parse(readFileSync(`${path}/country.json`));
        } catch (e) {
            throw new CustomError(e.message, 'places');
        }
    }
}

module.exports = Places;