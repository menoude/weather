'use strict'

class Location {

    constructor(places) {
        this.name = places.defaultLocation['value'];
        this.country = places.defaultLocation['country'];
        this.population = places.defaultLocation['population'];
        this.id = places.defaultLocation['geonameid'];
    }
    
    setFromSlot(places, locationSlot) {
        let place;
        
        place = places.lookUp(locationSlot['value']['value']);
        if (place) {
            this.name = place['value'];
            this.country = place['country'];
            this.population = place['population'];
            this.id = place['geonameid'];
        }
    }

    setFromSlots(places, locationSlot) {

    }
}

module.exports = Location;