const subscriptions = {
    'hermes/dialogueManager/sessionEnded': 'sessionEnded',
    'hermes/intent/davidsnips:WeatherForecast': 'WeatherForecast',
    'hermes/intent/davidsnips:WeatherConditionRequest': 'WeatherConditionRequest',
    'hermes/intent/davidsnips:TemperatureForecast': 'TemperatureForecast',
};

const hermes = {
    tts: 'hermes/tts/say',
    endSession: 'hermes/dialogueManager/endSession',
    siteId: 'default'
};

module.exports = {
    subscriptions: subscriptions,
    hermes: hermes
}