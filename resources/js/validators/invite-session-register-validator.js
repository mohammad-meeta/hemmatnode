'use strict';

/**
 * InviteSession Register Validator
 */
function InviteSessionValidator() {}
module.exports = InviteSessionValidator;

/**
 * Validation funciton
 */
InviteSessionValidator.validate = function validate(data) {
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
InviteSessionValidator.validateEdit = function validateEdit(data) {
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

