'use strict'

// if no time --> now
// if time interval --> as long as it's in the 5 days range
// if instant time --> if seconds, has to be later than now - 5sec, and in 5 days range
// if minutes, has to be later than now, and in 5 days range
// if hours, has to be later than now - 1 hour, and in 5 days range
// if day, has to be later than yesterday and in 5 days range, resolves to start now and end end of day
// if week, has to be later than last week and at most next week (depending on if we're)

const FUTURE_LIMIT = 5;
const futureInstantCheckers = {
    'Second': checkFutureTimes,
    'Minute': checkFutureTimes,
    'Hour': checkFutureTimes,
    'Day': checkFutureDay,
    'Week': checkFutureWeek
};

class Time {
    
    constructor(timeSlot) {
        this.formulation = null;
        this.timeSlot = timeSlot;
    }
}

class CurrentTime extends Time {
    
    constructor(timeSlot) {
        super(timeSlot);
        this.future = false;
    }

    setTime() {
        this.type = 'now';
        this.start = new Date();
        this.end = this.start;
    }

    checkRange() {
        return (true);
    }
}

class FutureInstant extends Time {
    
    constructor(timeSlot) {
        super(timeSlot);
        this.future = true;
        this.formulation = timeSlot.rawValue;
        this.type = timeSlot.value.grain;
        if (this.type === 'Month' || this.type === 'Year') {
            throw (new Error('timeRange error'));
        }
    }

    setTime() {
        this.start = new Date(this.timeSlot.value.value);
        this.end = this.start;
    }

    checkRange() {

    }
}

class FutureInterval extends Time {
    
    constructor(timeSlot) {
        super(timeSlot);
        this.future = true;
        this.type = 'interval';
        this.formulation = timeSlot.rawValue;
    }

    setTime() {
        this.start = new Date(this.timeSlot.value.from);
        this.end = new Date(this.timeSlot.value.to);
    }

    // checkRange = checkFutureTimes
}

FutureInterval.prototype.checkRange = checkFutureTimes;

// -------------

FutureInstant.prototype.setTime = function () {

};

FutureInstant.prototype.checkRange = futureInstantCheckers[this.type];

function checkFutureTimes() {
    let now, timeLimit;

    now = new Date();
    timeLimit = new Date();
    timeLimit.setDate(timeLimit.getDate() + FUTURE_LIMIT);
    if (this.start.getTime() < now.getTime() - 1000 || this.end > timeLimit) {
        throw (new Error('timeRange error'));
    }
}

function checkFutureDay() {
    let today, limitDay;

    today = new Date(new Date().toDateString());
    limitDay = new Date(today);
    limitDay.setDate(limitDay.getDate() + FUTURE_LIMIT);
    if (this.start < today || this.start > limitDay)
        throw (new Error('timeRange error'));
}

function checkFutureWeek() {
    let currentWeek, limitDay;

    currentWeek = new Date(new Date().toDateString());
    currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1);
    limitDay = new Date(currentWeek);
    limitDay.setDate(currentWeek.getDate() + 5);
    if (this.start < currentWeek || this.start > limitDay)
        throw (new Error('timeRange error'));
}

module.exports = Time;