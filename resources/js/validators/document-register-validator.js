'use strict';

/**
 * Document Register Validator
 */
function DocumentValidator() {}
module.exports = DocumentValidator;

/**
 * Validation funciton
 */
DocumentValidator.validate = function validate(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');

    const rules = {
        title: 'required|min:3|max:255'
    };
    let options = {
        lang : "fa",
        attributes : {
            title: 'عنوان'
        }
    };
    return BaseValidator.validate(data, rules, options);
};
/**
 * Validation edit funciton
 */
DocumentValidator.validateEdit = function validateEdit(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');

    const rules = {
        title: 'required|min:3|max:255',
    };
    let options = {
        lang : "fa",
        attributes : {
            title: 'عنوان'
        }
    };
    return BaseValidator.validate(data, rules, options);
};

