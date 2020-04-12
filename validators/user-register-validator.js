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

        First_Name: req.body.firstName,
        Last_Name: req.body.lastName,
        Nation_Code: req.body.nationCode,
        CellPhone: req.body.cellPhone

    };
};

/**
 * Rules function
 */
UserRegisterValidator.rules = function rules() {
    return {
        'name': 'required|min:4|max:25',
        'email': 'required|email',
        'first_name': 'required|min:3|max:25',
        'last_name': 'required|min:4|max:25',
        'nation_code': 'required|size:10',
        'cell_phone': 'required|size:11'

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
        nation_code: 'Nation_Code',
        cell_phone: 'cellPhone'
    };
};
