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
        let place, city, region, country;

        if (!locationSlots.length)
            return ;
        else if (locationSlots.length === 1) {
            place = places.lookUp(locationSlots[0].value.value);
            this._checkLength(place);
        } else if (locationSlots.length <= 3) {
            city = locationSlots.filter(slot => slot.slotName === 'city');
            region = locationSlots.filter(slot => slot.slotName === 'region');
            country = locationSlots.filter(slot => slot.slotName === 'country');
            this._checkValidSlots(city, region, country);
            if (locationSlots.length === 2 && !country.length) {
                country = places.regionToCountry(region[0]);
            else if (locationSlots.length === 2 && !city.length)
                place = places.lookUp(region[0], ['region']);
            else
                place = places.lookUp(city[0], 'city');
            this._checkLength(place);
            country = places.lookUp(country[0], ['country']);
            place = places.filterByCountry(place, country);
        } else
            throw new CustomError('', 'locationSlots');
        this._setAttributes(place[0]);
    }
    
    _setAttributes(place) {
        place = place[0];
        this.name = place.value;
        this.country = place.country;
        this.population = place.population;
        this.id = place.geonameid;
    }

    _checkLength(place) {
        if (!place.length)
            throw new CustomError('', 'place');
    }

    _checkValidSlots(city, region, country) {
        if (city.length > 1 || region.length > 1 || country.length > 1)
            throw new CustomError('', 'locationSlots');
    }
}

module.exports = Location;

// Determiner un lieu
// 0 slots
// Lieu par défaut

// 1 slot
// Lieu qui correspond avec comme ordre de recherche ville > region > pays
// tant que le lieu n'est pas retrouvé et qu'un split sur les espaces donne plus d'un résultat, on recommence la recherche avec le dernier token en moins
// Sinon on fail


// pb : peut tomber sur plusieurs cities et plusieurs regions !!
// 2 ou 3 slots
// city region --> transforme la region en country, devient comme un city country
// city region country --> ignore la region, comme si c'etait city country
// city country --> filtre les villes par le country
// region country --> filtre les regions par country

// 2 slots
// Si les slots sont de meme type on fail
// On commence par le plus petit (ville > region > pays)
// tant qu'on en trouve pas et que ça se splite par les espaces on essaye avec un token en moins
// Si on en trouve pas on fail
// si on en trouve un seul alors on l'utilise
// Si on en trouve plusieurs on utilise le deuxième slot pour preciser
// Si c'est un slot de region et que j'ai des villes, on cherche la premiere ville qui est du meme pays que la region
// Si c'est un slot de pays et que j'ai des villes ou des regions, on cherche la premiere ville/region avec ce pays
// Si on trouve rien, on prend la premiere ville/region

// 3 slots
// Si des slots sont de meme type on fail
// On commence par la ville
// tant qu'on la trouve pas et que ça se splite par les espaces on essaye avec un token en moins
// Si on la trouve pas on fail
// Si on en trouve une on l'utilise
// Si on en trouve plusieurs on utilise le pays pour preciser
// On cherche la premiere ville avec ce pays
// Si on trouve pas, on prend la premiere ville

// Plus de 3 slots
// On fail