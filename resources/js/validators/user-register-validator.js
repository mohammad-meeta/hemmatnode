'use strict';

const BaseValidator = require('JS-VALIDATORS/base-validator');

/**
 * User Register Validator
 */
function UserRegisterValidator() {}
module.exports = UserRegisterValidator;

/**
 * Validation funciton
 */
UserRegisterValidator.validate = function validate(data) {
    const rules = {
        'name': 'required|min:4|max:25',
        'password': 'required|min:6|max:50',
        'email': 'required|email'
    };

    const options = {
        attributes: {
            name: 'Username',
            password: 'Password',
            email: 'EMail Address'
        },
        messages: {
            'required.name': 'Field {:attribute} is a mandatory field'
        },
        lang: 'en'
    };

    return BaseValidator.validate(data, rules, options);
};
