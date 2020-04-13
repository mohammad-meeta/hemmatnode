'use strict';

const Validator = require("validatorjs");

/**
 * DataValidator class
 */
function DataValidator() {}
module.exports = DataValidator;

/**
 * Load custom rules
 */
DataValidator.loadCustomRules = function loadCustomRules() {
    require('JS-VALIDATORS/rules/custom-rules');
};

/**
 * Validate
 */
DataValidator.validate = function validate(data, rules, options) {
    options = options || {};
    const lang = options.lang || 'en';
    const messages = options.messages || {};
    const attributes = options.attributes || {};

    /* Set validator language */
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

    return {
        passes,
        validator
    };
};

/* Load custom rules */
DataValidator.loadCustomRules();
