'use strict'

function Report(intent, location, time, info) {
    this.intent = intent;
    this.location = location;
    this.time = time;
    this.info = info;
    this.buildReport();
    console.log(this);
    console.log('---------');    
}

Report.prototype.buildReport = function() {
    this.condition = 'sun';
    return ;
};

module.exports = Report;