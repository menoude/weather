'use strict'

const CustomError = require('./customError.js');

class Location {
    constructor(places, config) {
        let place;

        place = places.lookUp(config.defaultLocation);
        place = places.getMostPopulated(place);
        this.name = place.value;
        this.country = place.country;
        this.population = place.population;
        this.id = place.geonameid;
    }
    // sets the location using all the slots (3 at most)
    setFromSlots(places, locationSlots) {
        let place, countryHint;

        if (!Array.isArray(locationSlots) || !locationSlots.length)
            return ;
        else if (locationSlots.length === 1)
            place = places.lookUp(locationSlots[0]['value']['value']);
        else if (locationSlots.length === 2) {
            countryHint = locationSlots.filter(slot => slot.slotName === 'country');
            if (countryHint.length !== 1)
                throw new CustomError('', 'locationSlots');
            countryHint = places.lookUpCountry(countryHint[0]['value']['value']);
            place = places.lookUp(locationSlots.find(slot => slot.slotName !== 'country')['value']['value']);
            place = places.getCountrySpecific(place, countryHint);
        } else
            throw new CustomError('', 'locationSlots');
        place = places.getMostPopulated(place);
        this.name = place.value;
        this.country = place.country;
        this.population = place.population;
        this.id = place.geonameid;
    }
}

module.exports = Location;