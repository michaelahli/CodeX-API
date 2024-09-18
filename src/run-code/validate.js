const { supportedLanguages } = require("./instructions");

function validateInput(language, code) {
    if (!code) {
        throw {
            status: 400,
            error: "No Code found to execute."
        };
    }

    if (!supportedLanguages.includes(language)) {
        throw {
            status: 400,
            error: `Invalid language. Supported languages are: ${supportedLanguages.join(', ')}.`
        };
    }
}

module.exports = { validateInput };