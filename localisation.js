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
        this.places = {
            cities: JSON.parse(fs.readFileSync(`${this.placesData}/city.json`)),
            regions: JSON.parse(fs.readFileSync(`${this.placesData}/region.json`)),
            countries: JSON.parse(fs.readFileSync(`${this.placesData}/country.json`))
        }
    }
}

module.exports = Localisation;