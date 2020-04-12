'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function UserRegisterValidator() { }
module.exports = UserRegisterValidator;

/**
 * Validation funciton
 */
UserRegisterValidator.validate = function validate(req, res, next) {
    validator.validate(UserRegisterValidator, req, res, next);
};

/**
 * Data function
 */
UserRegisterValidator.data = function data(req) {
    return {
        Username: req.body.name,
        Password: req.body.password,
        Email: req.body.email,

        First_Name: req.body.profile.first_name,
        Last_Name: req.body.profile.last_name,
        Nation_Code: req.body.profile.nation_code

    };
};

/**
 * Rules function
 */
UserRegisterValidator.rules = function rules() {
    return {
        'name': 'required|min:4|max:25',
        'pwd': 'required|min:6|max:50',
        'email': 'required|email',
        'first_name': 'required|min:3|max:25',
        'last_name': 'required|min:4|max:25',
        'nation_code': 'required|min:10|max:10'
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
        name: 'Username',
        password: 'Password',
        email: 'Email',
        first_name: 'First_Name',
        last_name: 'Last_Name',
        nation_code: 'Nation_Code'
    };
};
