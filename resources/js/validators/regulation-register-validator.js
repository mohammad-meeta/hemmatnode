'use strict';

/**
 * Regulation Register Validator
 */
function RegulationValidator() {}
module.exports = RegulationValidator;

/**
 * Validation funciton
 */
RegulationValidator.validate = function validate(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');

    const rules = {
    };
    let options = {
        lang : "fa"
    };
    return BaseValidator.validate(data, rules, options);
};
/**
 * Validation edit funciton
 */
RegulationValidator.validateEdit = function validateEdit(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');

    const rules = {
        title: 'required|min:3|max:255'
    };
    let options = {
        lang : "fa",
        attributes: {
            title: 'عنوان'
        }
    };
    return BaseValidator.validate(data, rules, options);
};

