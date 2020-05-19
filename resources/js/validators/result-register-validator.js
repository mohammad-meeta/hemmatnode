'use strict';

/**
 * Result Register Validator
 */
function ResultValidator() {}
module.exports = ResultValidator;

/**
 * Validation funciton
 */
ResultValidator.validate = function validate(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');

    const rules = {
        result: 'required|min:3|max:255'
    };
    let options = {
        lang : "fa",
        attributes : {
            result: 'برآمد'
        }
    };
    return BaseValidator.validate(data, rules, options);
};
/**
 * Validation edit funciton
 */
ResultValidator.validateEdit = function validateEdit(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');

    const rules = {
        result: 'required|min:3|max:255',
    };
    let options = {
        lang : "fa",
        attributes : {
            result: 'برآمد'
        }
    };
    return BaseValidator.validate(data, rules, options);
};

