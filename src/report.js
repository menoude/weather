'use strict'

class Report {
    constructor(intent, location, time, info) {
        this.intent = intent;
        this.location = location;
        this.time = time;
        this.info = info;
        this.buildReport();
        console.log(this);
        console.log('---------');    
    }

    buildReport() {
        this.condition = 'sun';
        return ;
    }
}

module.exports = Report;