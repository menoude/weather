'use strict'

// possible error if no config file. To manage

const { readFileSync } = require('fs');
const ini = require('ini');

class Config {
    
    constructor(filePath) {
        let file, content;
        
        file = readFileSync(filePath, 'utf8');
        content = ini.parse(file);
        for (let section in content) {
            for (let entry in content[section]) {
                this[Config.snakeToCamel(entry)] = content[section][entry];
            }
        }
    }

    static snakeToCamel(string) {
        return (string.replace(/\_\w/g, function(snakePart) {
            return (snakePart[1].toUpperCase());
        }));
    }
}

module.exports = Config;