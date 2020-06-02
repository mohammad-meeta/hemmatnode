'use strict';

/**
 * Memorandum Register Validator
 */
function MemorandumValidator() {}
module.exports = MemorandumValidator;

/**
 * Validation funciton
 */
MemorandumValidator.validate = function validate(data) {
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
MemorandumValidator.validateEdit = function validateEdit(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');

    const rules = {

    };
    let options = {
        lang : "fa",
        attributes : {
        }
    };
    return BaseValidator.validate(data, rules, options);
};

