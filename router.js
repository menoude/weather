'use strict'

const hermes = {
    'hermes/hotword/default/detected': 'hotword',
    'hermes/dialogueManager/sessionEnded': 'sessionEnd',
    'hermes/intent/davidsnips:WeatherForecast': 'WeatherForecast',
    'hermes/intent/davidsnips:WeatherConditionRequest': 'WeatherConditionRequest',
    'hermes/intent/davidsnips:TemperatureForecast': 'TemperatureForecast',
}

function Router(topic, data) {
    this.message = hermes[topic];
    this.data = JSON.parse(data);

    if (message) {
        
    }
    this.endReason = null;
    this.sessionId = null;
    this.slots = null;
    this.answer = answer = {
        sessionId: null,
        text: null
    };
}