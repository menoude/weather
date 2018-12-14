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

const errorMessages = {
    english: {
        mqtt: 'Sorry, there was a communication error with the Snips platform',
        config: 'Sorry, there was an error with your config file.',
        locale: 'Sorry, there was an error with your language settings.',
        places: 'Sorry, there was an error with your location data.',
        abortedByUser: 'Sorry, there was an error.',
        intentNotRecognized: 'Sorry, I did not understand your request.',
        timeout: 'Sorry, your session timed out.',
        timeRange: 'Sorry, the time period should be within 5 days from now.',
        APICall: 'Sorry, there was a communication issue with the service provider.',
        localisation: 'Sorry, this localisation is not supported.'
    },
    french: {
        mqtt: 'Désolé, une erreur s\'est produite lors de la communication avec la plateforme Snips',
        config: 'Désolé, une erreur s\'est produite avec votre fichier de configuration.',
        locale: 'Désolé, une erreur s\'est produite avec vos paramètres de localisation.',
        places: 'Désolé, une erreur s\'est produite avec vos données géographiques.',
        abortedByUser: 'Désolé une erreur s\'est produite.',
        intentNotRecognized: 'Désolé, je n\'ai pas compris votre requête.',
        timeout: 'Désolé, la durée maximale de votre session est dépassée.',
        timeRange: 'Désolé, la période demandée doit être comprise entre aujourd\'hui et dans 5 jours au plus tard.',
        APICall: 'Désolé, il y a eu une erreur de communication avec le service de météo.',
        localisation: 'Désolé, cette langue n\'est pas supportée.'
    }
};

const conditions = {
    english: {
        sun: 'sunny',
        rain: 'rainy',
        cold: 'cold',
        warm: 'warm',
    },
    french: {
        sun: 'ensoleillé',
        rain: 'pluvieux',
        cold: 'froid',
        warm: 'chaud',
    }
};

const presentAnnouncement = {
    english: {
        weatherCondition: 'The weather is mostly',
        temperatureForecast: 'Temperature is about'
    },
    french: {
        weatherCondition: 'Le temps est globalement',
        temperatureForecast: 'La température est de'
    }
};

const futureAnnouncement = {
    english: {
        weatherCondition: 'The weather will be mostly',
        temperatureForecast: 'The forecast is'
    },
    french: {
        weatherCondition: 'Le temps sera globalement',
        temperatureForecast: 'La température sera de'
    }
};

const placesData = {
    english: './mappings/en_mappings',
    french: './mappings/fr_mappings'
}

module.exports = {
    subscriptions: subscriptions,
    hermes: hermes,
    errorMessages: errorMessages,
    conditions: conditions,
    presentAnnouncement: presentAnnouncement,
    futureAnnouncement: futureAnnouncement,
    placesData: placesData
};