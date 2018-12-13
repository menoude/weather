'use strict'

const fs = require('fs');
const { errorMessages, conditions, presentAnnouncement, futureAnnouncement, placesData } = require('./languageResources.js');

class Localisation {
    
    constructor(config) {        
        this.locale = config.locale;
        this.errorMessages = errorMessages[this.locale];
        this.conditions = conditions[this.locale];
        this.presentAnnouncement = presentAnnouncement[this.locale];
        this.futureAnnouncement = futureAnnouncement[this.locale];
        this.placesData = placesData[this.locale];
    }
    
    loadPlaces() {
        let path;

        path = this.placesData;
        this.places = {
            cities: JSON.parse(fs.readFileSync(`${path}/city.json`)),
            regions: JSON.parse(fs.readFileSync(`${path}/region.json`)),
            countries: JSON.parse(fs.readFileSync(`${path}/country.json`))
        }
    }
}

module.exports = Localisation;