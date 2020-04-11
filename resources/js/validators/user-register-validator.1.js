'use strict';

/**
 * User Register Validator
 */
function UserRegisterValidator() {}
module.exports = UserRegisterValidator;

/**
 * Validation funciton
 */
UserRegisterValidator.validate = function validate(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');
    const rules = {
        name: 'required',
        email: 'required|email',
        firstName: 'required',
        lastName: 'required',
        nationCode: 'required|numeric|min:10',
        cellphone: 'required|numeric|min:10'
    };

    return BaseValidator.validate(data, rules);
};
