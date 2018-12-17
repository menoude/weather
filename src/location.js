'use strict'

class Location {
    constructor(config) {
// set the default location
    }
    
    setFromSlot(locationSlot, places) {
        let place;
        
        if (!locationSlot)
            return ;
        this.name = locationSlot.value.value;
        this.type = locationSlot.slotName;
        this.id = places[this.type][this.name].id;
    }
}

module.exports = Location;