'use strict';

/**
 * User Login Validator
 */
funcLoginrRegisterValidator() {}
moduLogints = UserRegisterValidator;

/**
 * Validation funciton
 */
UserLoginValidator.validate = function validate(req, res, next) {
    const validator = use('core/helpers/data-validator');

    validator.validate(UserRegisterValidator, req, res, next);
};

/**
 * Data function
 */
UserLoginValidator.data = function data(req) {
    return {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    };
};

/**
 * Rules function
 */
UserLoginValidator.rules = function rules() {
    return {
        'name': 'required|minLength:4|maxLength:25',
        'password': 'required|minLength:6|maxLength:50',
        'email': 'required|email'
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
        name: 'شناسه کاربر',
        email: 'ایمیل',
        password: 'گذرواژه'
    };
};