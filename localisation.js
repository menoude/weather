const errorMessages = {
    english: {
        abortedByUser: 'Sorry, there was an error.',
        intentNotRecognized: 'Sorry, I did not understand your request.',
        timeout: 'Sorry, your session timed out.',
        error: 'Sorry, there was an error.',
        timeRange: 'Sorry, the time period should be within 5 days from now.',
        APICall: 'Sorry, there was a communication issue with the service provider.',
        localisation: 'Sorry, this localisation is not supported.'
    },
    french: {
        abortedByUser: 'Désolé une erreur s\'est produite.',
        intentNotRecognized: 'Désolé, je n\'ai pas compris votre requête.',
        timeout: 'Désolé, la durée maximale de votre session est dépassée.',
        error: 'Désolé, une erreur s\'est produite.',
        timeRange: 'Désolé, la période demandée doit être comprise entre aujourd\'hui et dans 5 jours au plus tard.',
        APICall: 'Désolé, il y a eu une erreur de communication avec le service de météo.',
    }
};

const defaultAnswers = {
    english: {
        sun: 'The weather will be mostly sunny.',
        rain: 'The weather will be mostly rainy.',
        cold: 'The weather will be mostly cold.',
        warm: 'The weather will be mostly warm.',
        umbrella: 'D\'ont forget your umbrella.',
    },
    french: {
        sun: 'Le temps sera globalement ensoleillé.',
        rain: 'Le temps sera globalement pluvieux.',
        cold: 'Le temps sera globalement froid.',
        warm: 'Le temps sera globalement chaud.',
        umbrella: 'N\'oubliez pas votre parapluie.',
    }
};

function Localisation() {
    this.language = this.findLanguage();
    this.errorMessages = errorMessages[this.language];
    this.defaultAnswers = defaultAnswers[this.language]; 
}

Localisation.prototype.findLanguage = function() {
    return ('english');
};

module.exports = Localisation;