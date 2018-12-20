'use strict'

const CustomError = require('./customError.js');
const Moment = require('moment');

class Period {
    constructor() {
        this.start = new Moment();
        this.end = this.start;
    }
    // creates a start and an end from time slots. If many, tries to join them ('wednesday and thursday and friday')
    setFromSlots(timeSlot) {
        return ;
        if (!timeSlot)
        return ;
    }
    // intersects the time range found with the API limit
    intersect(daysLimit) {
        let now, limit;

        now = new Moment();
        limit = new Moment().add(daysLimit, 'days');
        console.log(this.start, now, this.end, limit);
        this.start = this.start.isAfter(now) ? this.start : now; // to fix!!
        this.end = this.end.isBefore(limit) ? this.end : limit;
        console.log(this.start, this.end);
        
        if (this.start.isAfter(this.end))
            throw new CustomError('', 'intersection');
    }
}

module.exports = Period;