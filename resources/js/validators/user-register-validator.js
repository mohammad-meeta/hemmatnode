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
        name: 'required|min:3|max:25',
        email: 'required|email',
        firstName: 'required',
        lastName: 'required',
        nationCode: ['required', 'min:10', 'max:10', 'regex:/^[0-9]*$/'],
        cellphone: ['required', 'min:11', 'max:11', 'regex:/^[0-9]*$/']
    };

    return BaseValidator.validate(data, rules);
};
