'use strict'

export class Report {
    constructor(intent, location, time, info) {
        this.intent = intent;
        this.location = location;
        this.time = time;
        this.info = info;
        this.buildReport();
        console.log(this);
        console.log('---------');    
    }

    buildReport = function() {
        this.condition = 'sun';
        return ;
    }
}