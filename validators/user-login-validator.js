'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function UserLoginValidator() {}
module.exports = UserLoginValidator;

/**
 * Validation funciton
 */
UserLoginValidator.validate = function validate(req, res, next) {
    validator.validate(UserLoginValidator, req, res, next);
};

/**
 * Validation funciton
 */
UserLoginValidator.lang = function lang() {
    return 'fa';
};

/**
 * Data function
 */
UserLoginValidator.data = function data(req) {
    return {
        name: req.body.name,
        password: req.body.password
    };
};

/**
 * Rules function
 */
UserLoginValidator.rules = function rules() {
    return {
        'name': 'required|min:3|max:25',
        'password': 'required|min:6|max:50'
    };
};

/**
 * Messages function
 */
UserLoginValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
UserLoginValidator.attributes = function attributes() {
    return {
        name: 'Username',
        password: 'Password'
    };
};
