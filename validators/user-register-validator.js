'use strict';

const validator = use('core/helpers/data-validator');
const Validator = require('validatorjs');

/**
 * User Login Validator
 */
function UserRegisterValidator() { }
module.exports = UserRegisterValidator;

UserRegisterValidator.async = true;

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
        name: req.body.name,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationCode: req.body.nationCode,
        cellphone: req.body.cellphone
    };
};

/**
 * Rules function
 */
UserRegisterValidator.rules = function rules() {
    return {
        'name': 'required|min:3|max:25|username_available',
        'email': 'required|email|email_available',
        'firstName': 'required|min:3|max:25',
        'lastName': 'required|min:4|max:25',
        'nationCode': 'required|size:10',
        'cellphone': 'required|size:11'
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
        name: 'userName',
        email: 'email',
        firstName: 'firstName',
        lastName: 'lastName',
        nationCode: 'nationCode',
        cellphone: 'cellphone'
    };
};
