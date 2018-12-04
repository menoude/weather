'use strict'

const { sentances } = require('./utils.js');

function Report(data) {
    this.data = data;
}

Report.prototype.buildReport = function() {
    return (this.data);
};

module.exports = Report;