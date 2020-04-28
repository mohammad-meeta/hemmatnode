'use strict';

const Validator = require("validatorjs");

/**
 * DataValidator class
 */
function DataValidator() {}
module.exports = DataValidator;

/**
 * Validate
 */
DataValidator.validate = function validate(customValidator, req, res, next) {
    let data = {};
    let rules = {};
    let messages = {};
    let attributes = {};
    let lang = req.lang || 'en';

    if (customValidator.data) {
        data = customValidator.data(req);
    }

    if (customValidator.rules) {
        rules = customValidator.rules(req);
    }

    if (customValidator.messages) {
        messages = customValidator.messages(req);
    }

    if (customValidator.attributes) {
        attributes = customValidator.attributes(req);
    }


    /* Setup language */
    if (null != customValidator.lang) {
        lang = customValidator.lang();
    }
    Validator.useLang(lang);

    /* Make a new instance */
    const validator = new Validator(data, rules, messages);

    /* Set attribute name */
    const attributeNames = {};
    Object.keys(attributes)
        .forEach(key => attributeNames[key] = attributes[key]);
    validator.setAttributeNames(attributes);

    /* Validate */
    const passes = validator.passes();

    if (passes) {
        next();
    } else {
        const errors = DataValidator.generateErrors(validator);

        res.status(400)
            .send(errors)
            .end();
    }
};

/**
 * Generate errors list
 */
DataValidator.generateErrors = function generateErrors(validator) {
    const allErrors = validator.errors.all();

    /* All errors */
    const errors = [];
    Object.keys(allErrors)
        .forEach(key => {
            errors.push(allErrors[key].join('\n'));
        });

    return errors.join('\n');
};
