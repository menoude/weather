'use strict'

function Time(timeSlot) {
    this.start = new Date();
    this.end = this.start;
    console.log(this);
    console.log('timeSlot received: ', timeSlot);
    console.log('---------');
}

module.exports = Time;