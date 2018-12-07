'use strict'

const { readFileSync } = require('fs');

const errorMessages = {
    english: {
        abortedByUser: 'Sorry, there was an error.',
        intentNotRecognized: 'Sorry, I did not understand your request.',
        timeout: 'Sorry, your session timed out.',
        error: 'Sorry, there was an error.',
        timeRange: 'Sorry, the time period should be within 5 days from now.',
        APICall: 'Sorry, there was a communication issue with the service provider.',
        localisation: 'Sorry, this localisation is not supported.'
    },
    french: {
        abortedByUser: 'Désolé une erreur s\'est produite.',
        intentNotRecognized: 'Désolé, je n\'ai pas compris votre requête.',
        timeout: 'Désolé, la durée maximale de votre session est dépassée.',
        error: 'Désolé, une erreur s\'est produite.',
        timeRange: 'Désolé, la période demandée doit être comprise entre aujourd\'hui et dans 5 jours au plus tard.',
        APICall: 'Désolé, il y a eu une erreur de communication avec le service de météo.',
    }
};

const conditions = {
    english: {
        sun: 'sunny',
        rain: 'rainy',
        cold: 'cold',
        warm: 'warm',
    },
    french: {
        sun: 'ensoleillé',
        rain: 'pluvieux',
        cold: 'froid',
        warm: 'chaud',
    }
};

const presentAnnouncement = {
    english: {
        weatherCondition: 'The weather is mostly',
        temperatureForecast: 'Temperature is about'
    },
    french: {
        weatherCondition: 'Le temps est globalement',
        temperatureForecast: 'La température est de'
    }
};

const futureAnnouncement = {
    english: {
        weatherCondition: 'The weather will be mostly',
        temperatureForecast: 'The forecast is'
    },
    french: {
        weatherCondition: 'Le temps sera globalement',
        temperatureForecast: 'La température sera de'
    }
};

const placesData = {
    english: './en_mappings',
    french: './fr_mappings'
}

function Localisation() {
    this.language = this.findLanguage();
    this.errorMessages = errorMessages[this.language];
    this.conditions = conditions[this.language];
    this.presentAnnouncement = presentAnnouncement[this.language];
    this.futureAnnouncement = futureAnnouncement[this.language];
    this.placesData = placesData[this.language];
    this.loadPlaces();
}

Localisation.prototype.findLanguage = function () {
    return ('english');
};

Localisation.prototype.loadPlaces = function() {
    this.places = {
        cities: JSON.Parse(readFileSync(`${this.placesData}/city.json`)),
        regions: JSON.Parse(readFileSync(`${this.placesData}/region.json`)),
        countries: JSON.Parse(readFileSync(`${this.placesData}/country.json`))
    }
};

module.exports = Localisation