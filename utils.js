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

const API = {
    key: '86b50369b1aeedddf798aa6993a45bc7',
    url: 'http://api.openweathermap.org/data/2.5/forecast?'
};

module.exports = {
    subscriptions: subscriptions,
    hermes: hermes,
    sessionEndMessages: sessionEndMessages,
    API: API
};