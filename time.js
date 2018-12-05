'use strict'

function Time(timeSlot) {
    console.log(timeSlot);
    this.start = new Date();
    this.end = this.start;
    console.log(this);
}

module.exports = Time;