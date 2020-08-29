'use strict';

/**
 * Project Register Validator
 */
function ProjectValidator() {}
module.exports = ProjectValidator;

/**
 * Validation funciton
 */
ProjectValidator.validate = function validate(data) {
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
ProjectValidator.validateEdit = function validateEdit(data) {
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

