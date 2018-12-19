'use strict'

const { placesData } = require('./utils.js');
const { readFileSync } = require('fs');
const CustomError = require('./customError.js');

class Places {
    constructor() {
        this.city = {
            "New York City": {
                "geonameid": "5128581", 
                "country": "US", 
                "value": "New York City", 
                "population": 8175133
            }
        }
        this.region = {
            "New York": {
                "geonameid": "5128638", 
                "country": "US", 
                "value": "New York", 
                "population": 19274244
              }
        }
        this.country = {
            "United States": {
                "geonameid": "6252001", 
                "country": "US", 
                "value": "United States", 
                "population": 310232863
            }
        }
    }

    loadData(locale) {
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

    lookUp(place) {
        for (let category of ['city', 'region', 'country']) {
            if (this[category][place])
                return (this[category][place]);
        }
        throw new CustomError('', 'place');
    }
    
    lookUpCountry(country) {
        if (this.country[country])
            return (this.country[country]);
        throw new CustomError('', 'country');
    }

    getMostPopulated(list) {
        if (!Array.isArray(list))
            return (list);
        list.sort((a, b) => {
            return (a.population < b.population);
        });
        return (list[0]);
    }

    getCountrySpecific(list, countrySlot) {
        if (list.length === 1)
            return (list);
        return (list.filter((place) => place.country === countrySlot.country));
    }
}

module.exports = Places;