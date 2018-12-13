'use strict'

const { readFileSync } = require('fs');
const { errorMessages, conditions, presentAnnouncement, futureAnnouncement, placesData } = require('./languageResources.js');

class Localisation {
    
    constructor() {
        this.language = this.findLanguage();
        this.errorMessages = errorMessages[this.language];
        this.conditions = conditions[this.language];
        this.presentAnnouncement = presentAnnouncement[this.language];
        this.futureAnnouncement = futureAnnouncement[this.language];
        this.placesData = placesData[this.language];
        this.loadPlaces();
    }
    
    findLanguage() {
        return ('english');
    }

    loadPlaces() {
        this.places = {
            cities: JSON.parse(readFileSync(`${this.placesData}/city.json`)),
            regions: JSON.parse(readFileSync(`${this.placesData}/region.json`)),
            countries: JSON.parse(readFileSync(`${this.placesData}/country.json`))
        }
    }
}

module.exports = Localisation;