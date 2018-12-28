'use strict'

const CustomError = require('./customError.js');

class Location {
    constructor(places, config) {
        let place;

        place = places.lookUp(config.defaultLocation)[0];
        this.name = place.value;
        this.country = place.country;
        this.population = place.population;
        this.id = place.geonameid;
    }

    setFromSlots(places, slots) {
        let place, city, region, country;

        console.log(slots);
        
        if (!slots.length)
            return ;
        else if (slots.length > 3)
            throw new CustomError('', 'slots');
        else if (slots.length === 1)
            place = places.lookUp(slots[0].value.value);
        else {
            city = this._extractSlot(slots, 'city');
            region = this._extractSlot(slots, 'region');
            country = this._extractSlot(slots, 'country');
            if (!country)
                place = places.filterByRegion(city, region);
            else if (!city || !region)
                place = places.filterByCountry(city ? city : region, country);
            else
                place = places.filterCitiesByCountry(places.filterByRegion(city, region), country);
            console.log(place);
        }
        if (!place.length)
            throw new CustomError('', 'place');
        this._setAttributes(place[0]);
    }

    _extractSlot(slots, type) {
        let filtered;
        
        filtered = slots.filter(slot => slot.slotName === type);
        if (filtered.length > 1)
            throw new CustomError('', 'slots');
        else if (!filtered.length)
            return (null);
        return (filtered[0].value.value);
    }

    _setAttributes(place) {
        this.name = place.value;
        this.country = place.country;
        this.population = place.population;
        this.id = place.geonameid;
    }
}

module.exports = Location;
