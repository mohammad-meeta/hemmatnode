'use strict';

/**
 * User Register Validator
 */
function UserRegisterValidator() {}
module.exports = UserRegisterValidator;

/**
 * Validation funciton
 */
UserRegisterValidator.validate = function validate(req, res, next) {
    const DataValidator = use('core/helpers/data-validator');
    DataValidator.validate(UserRegisterValidator, req, res, next);
};

/**
 * Data function
 */
UserRegisterValidator.data = function data(req) {
    return {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    };
};

/**
 * Rules function
 */
UserRegisterValidator.rules = function rules() {
    return {
        'name': 'required|minLength:4|maxLength:25',
        'password': 'required|minLength:6|maxLength:50',
        'email': 'required|email'
    };
};

/**
 * Messages function
 */
UserRegisterValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
UserRegisterValidator.attributes = function attributes() {
    return {
        name: 'شناسه کاربر',
        email: 'ایمیل',
        password: 'گذرواژه'
    };
};