'use strict'

const sessionEndMessages = {
    abortedByUser: 'Sorry, there was an error.',
    intentNotRecognized: 'Sorry, I did not understand your request.',
    timeout: 'Sorry, your session timed out.',
    error: 'Sorry, there was an error.'
}

function Server(topic, data) {
    this.topic = hermes[topic];
    this.data = JSON.parse(data);
    this.message = null;
    this.answerMessage = null;
    this.endReason = null;
    this.sessionId = null;
    this.slots = null;
}

Server.prototype.ignore = () => {
    if (this.topic == hermes)    
}

Server.prototype.ignore = (topic, data) {
    let answer

    topic = hermes[topic];
    if (topic == 'hotword')
        return true;
    else if (topic == 'sessionEnded') {
        data = JSON.parse(data);

    }
}

if (message == 'sessionEnd') {
console.log('session ended');
endReason = data.termination.reason;
answer.payload = sessionEndMessages[endReason];
console.log(data);
} else {
console.log(`recognized ${message}`);
}