'use strict'

function Time(timeSlot) {    
    this.now = new Date();
    if (!timeSlot) {
        this.start = this.now;
        this.end = this.now;
        return ;
    } 
    if (timeSlot.value.kind === 'InstantTime') {
        this.start = new Date(timeSlot.value.value);
        this.end = this.start;
    } else {
        this.start = new Date(timeSlot.value.from);
        this.end = new Date(timeSlot.value.to);
    }
    console.log(this);
    console.log('---------');
    this.checkValidity();
}

Time.prototype.checkValidity = function() {
    let timeLimit;
    
    timeLimit = new Date();
    timeLimit.setDate(timeLimit.getDate() + 5);
    if (this.start < this.now || this.end > timeLimit)
        throw(new Error('timeRange error'));
}

module.exports = Time;