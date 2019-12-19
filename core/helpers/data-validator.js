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
DataValidator.validate = function validate(data, rules, messages) {
    const validator = new Validator(data, rules, messages);
    const passes = validator.passes();

    return {
        passes,
        validator
    };
};