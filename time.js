'use strict'

function Time(timeSlot) {        
    this.formulation = null;
    if (!timeSlot) {
        this.start = new Date();
        this.end = this.start;
    } else {
        this.formulation = timeSlot.rawValue
        this.value = timeSlot.value;
        this.createFutureDate();
        this.checkRange();
        delete this.value;
    }
    console.log(this);
    console.log('---------');
}

Time.prototype.createFutureDate = function() {
    if (this.value.kind === 'InstantTime') {
        this.start = new Date(this.value.value);
        this.end = this.start;
    } else {
        this.start = new Date(this.value.from);
        this.end = new Date(this.value.to);
    }
};

Time.prototype.checkRange = function() {
    let now, timeLimit;

    now = new Date();
    timeLimit = new Date();
    timeLimit.setDate(timeLimit.getDate() + 5);
    if (this.start.getTime() < now.getTime() - 2000 || this.end > timeLimit) {
        throw(new Error('timeRange error'));
    }
};

module.exports = Time;