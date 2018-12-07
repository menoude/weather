'use strict'

// if no time --> now
// if time interval --> as long as it's in the 5 days range
// if instant time --> if seconds, has to be later than now - 5sec, and in 5 days range
// if minutes, has to be later than now, and in 5 days range
// if hours, has to be later than now - 1 hour, and in 5 days range
// if day, has to be later than yesterday and in 5 days range, resolves to start now and end end of day
// if week, has to be later than last week and at most next week (depending on if we're)


function Time(timeSlot) {
    let method;

    this.formulation = null;
    this.future = false;
    this.timeSlot = timeSlot;
    this.setTimeMethods = {
        'Second': setFutureInstant.bind(this),
        'Minute': setFutureInstant.bind(this),
        'Hour': setFutureInstant.bind(this),
        'Day': setFutureDay.bind(this),
        'Week': setFutureWeek.bind(this)
    };
    if (!timeSlot)
        this.setCurrentTime();
    else if (timeSlot.value.kind === 'InstantTime')
        this.setFutureInterval();
    else {
        method = this.setTimeMethods(timeSlot.value.grain);
        if (!method)
            throw (new Error('timeRange error'));
        else
            method();
    }
}

Time.prototype.setCurrentTime() {
    this.start = new Date();
    this.end = this.start;
};

Time.prototype.setFutureInterval() {
    this.future = true;
    this.formulation = timeSlot.rawValue
    this.start = new Date(this.value.from);
    this.end = new Date(this.value.to);
    this.checkRawTimeRange();
};

Time.prototype.setFutureInstant = function() {
    this.future = true;
    this.formulation = timeSlot.rawValue
    this.start = new Date(this.value.value);
    this.end = this.start;
    this.checkRawTimeRange();
};

Time.prototype.setFutureDay = function() {
    let now, today, tonight;

    now = new Date();
    today = new Date(now.toDateString());
    this.start = this.value.value;
    if (this.start < )
    tonight = new Date(today);
    tonight.setDate(tonight.getDate() + 1);
    this.end = this.value.value;
};

Time.prototype.setFutureWeek = function() {

};

Time.prototype.checkRawTimeRange = function() {
    let now, timeLimit;
    
    now = new Date();
    timeLimit = new Date();
    timeLimit.setDate(timeLimit.getDate() + 5);
    if (this.start.getTime() < now.getTime() - 1000 || this.end > timeLimit) {
        throw (new Error('timeRange error'));
    }
};
module.exports = Time;