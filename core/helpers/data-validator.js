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
    const data = customValidator.data(req) || {};
    const rules = customValidator.rules() || {};
    const messages = customValidator.messages() || {};
    const attributes = customValidator.attributes() || {};

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
    Object.keys(allErrors)
        .forEach(key => {
            console.log(allErrors[key]);
        });

    /* TODO: MAKE ERROR STRING */
    return [
        'aaaaaaaa',
        'bbbbbbbbb'
    ];
};