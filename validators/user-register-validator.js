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
    const DataValidator = use('core/helpers/data-validator');
    const rules = {
        'name': 'required|minLength:4|maxLength:25',
        'password': 'required|minLength:6|maxLength:50',
        'email': 'required|email'
    };

    return DataValidator.validate(data, rules);
};