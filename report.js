'use strict'

function Report(data) {
    this.data = data;
}

Report.prototype.buildReport = function() {
    return (this.data);
};

module.exports = Report;