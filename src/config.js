
'use strict'

const { readFileSync } = require('fs');
const ini = require('ini');

class Config {
    
    constructor(filePath) {
        let file, content;
        
        try {
            file = readFileSync(filePath, 'utf8');
        } catch (e) {
            throw new Error('problem with the config file');
        }
        content = ini.parse(file);
        for (let section in content) {
            for (let entry in content[section]) {
                this[Config.snakeToCamel(entry)] = content[section][entry];
            }
        }
        this.locale = this.locale.toLowerCase();
        if (!(this.locale == 'english' || this.locale == 'french'))
            throw new Error('problem with the locale');
    }

    static snakeToCamel(string) {
        return (string.replace(/\_\w/g, function(snakePart) {
            return (snakePart[1].toUpperCase());
        }));
    }
}

module.exports = Config