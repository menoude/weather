'use strict'

function Report(intent, location, time, info) {
    this.intent = intent;
    this.city = location.city;
    this.start = time.start;
    this.end = time.end;
    this.buildReport();
}

Report.prototype.buildReport = function() {
    this.condition = 'sun';
    return ;
};

module.exports = Report;