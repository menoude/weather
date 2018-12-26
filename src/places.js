'use strict'

const {
    placesData
} = require('./utils.js');
const {
    readFileSync
} = require('fs');
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

    loadData(config) {
        let path;

        path = placesData[config.locale];
        try {
            this.city = JSON.parse(readFileSync(`${path}/city.json`));
            this.region = JSON.parse(readFileSync(`${path}/region.json`));
            this.country = JSON.parse(readFileSync(`${path}/country.json`));
        } catch (e) {
            throw new CustomError(e.message, 'places');
        }
    }

    lookUp(place, categories = ['city', 'region', 'country']) {
        let composite;

        composite = place.split(/,| /);
        while (composite.length) {
            place = composite.join(' ');
            for (let category of categories) {
                if (this[category][place]) {
                    return (Array.isArray(this[category][place] ?
                        this[category][place] : [this[category][place]]));
                }
                composite.pop();
            }
        }
    }

    regionToCountry(region) {
        region = this.lookUp(region, ['region']);
        return (this.lookUp(region))
    }

    filterByCountry(places, country) {
        if (places.length === 1)
            return (places);
        return (places.filter(place => place.country === country.country));
    }
}

module.exports = Places;