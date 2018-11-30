const subscriptions = {
    'hermes/dialogueManager/sessionEnded': 'sessionEnded',
    'hermes/intent/davidsnips:WeatherForecast': 'WeatherForecast',
    'hermes/intent/davidsnips:WeatherConditionRequest': 'WeatherConditionRequest',
    'hermes/intent/davidsnips:TemperatureForecast': 'TemperatureForecast',
};

const hermes = {
    ttsEndpoint: 'hermes/tts/say',
    siteId: 'default'
};

const sessionEndMessages = {
    abortedByUser: 'Sorry, there was an error.',
    intentNotRecognized: 'Sorry, I did not understand your request.',
    timeout: 'Sorry, your session timed out.',
    error: 'Sorry, there was an error.'
};

module.exports = {
    subscriptions: subscriptions,
    hermes: hermes,
    sessionEndMessages: sessionEndMessages
};