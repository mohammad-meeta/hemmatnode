'use strict';

const validator = use('core/helpers/data-validator');
const Validator = require('validatorjs');

/**
 * Role Login Validator
 */
function RoleRegisterValidator() {}
module.exports = RoleRegisterValidator;

RoleRegisterValidator.async = true;

/**
 * Validation funciton
 */
RoleRegisterValidator.lang = function lang() {
    return 'fa';
};


/**
 * Validation funciton
 */
RoleRegisterValidator.validate = function validate(req, res, next) {

    validator.validate(RoleRegisterValidator, req, res, next);
};

/**
 * Data function
 */
RoleRegisterValidator.data = function data(req) {
    return {
        name: req.body.name,
        permision: req.body.permision
    };
};

/**
 * Rules function
 */
RoleRegisterValidator.rules = function rules() {
    return {
        'name': 'required|min:3|max:25|user_name_available',
        'permision': 'required|array'
    };
};

/**
 * Messages function
 */
RoleRegisterValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
RoleRegisterValidator.attributes = function attributes() {
    return {
        name: 'name',
        password: 'permision'
    };
};