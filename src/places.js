'use strict'

const { placesData } = require('./utils.js');
const { readFileSync } = require('fs');
const CustomError = require('./customError.js');

class Places {

    constructor() {
        this.cities = {
            "New York City": {
                "geonameid": "5128581", 
                "value": "New York City", 
                "population": 8175133
            }
        }
        this.regions = {
            "California": {
                "geonameid": "5332921", 
                "country": "US", 
                "value": "California", 
                "population": 37691912
            },
        }
        this.countries = {
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
            this.places = {
                cities: JSON.parse(readFileSync(`${path}/city.json`)),
                regions: JSON.parse(readFileSync(`${path}/region.json`)),
                countries: JSON.parse(readFileSync(`${path}/country.json`))
            }
        } catch (e) {
            throw new CustomError(e.message, 'places');
        }
    }
}

module.exports = Places;