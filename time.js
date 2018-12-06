'use strict'

function Time(timeSlot) {        
    this.now = new Date();
    if (!timeSlot) {
        this.start = this.now;
        this.end = this.now;
    else if (timeSlot.value.kind === 'InstantTime')
        this.createFutureDate(timeSlot.value);
    else
        this.createFutureInterval(timeSlot.value);
    console.log(this);
    console.log('---------');
}

Time.prototype.createFutureDate = function(timeSlot) {
    let future, timeLimit;

    future = new Date(timeSlot.value.value);
    timeLimit = new Date();
    timeLimit.setDate(timeLimit.getDate() + 5);
    if (future.getSeconds() < this.now.getSeconds() - 2 || future > timeLimit)
        throw(new Error('timeRange error'));
    this.start = future;
    this.end = future;
};

Time.prototype.createFutureInterval = function() {
    let futureStart, futureEnd, timeLimit;
    
    this.start = new Date(timeSlot.value.from);
    this.end = new Date(timeSlot.value.to);
};


Time.prototype.throwError = function() {

};

module.exports = Time;