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
    };
    let options = {
        lang : "fa"
    };
    return BaseValidator.validate(data, rules, options);
};
/**
 * Validation edit funciton
 */
InviteSessionValidator.validateEdit = function validateEdit(data) {
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

