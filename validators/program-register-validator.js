'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function ProgramValidator() {}
module.exports = ProgramValidator;

ProgramValidator.async = true;

/**
 * Validation funciton
 */
ProgramValidator.lang = function lang() {
    return 'fa';
};

/**
 * Validation funciton
 */
ProgramValidator.validate = function validate(req, res, next) {

    validator.validate(ProgramValidator, req, res, next);
};

/**
 * Data function
 */
ProgramValidator.data = function data(req) {
    return {
        user_id: req.session.auth.userId,
        title: req.body.title,
    };
};

/**
 * Rules function
 */
ProgramValidator.rules = function rules(req) {
    return {
        'user_id': 'required',
        'title': 'required',
    };
};

/**
 * Messages function
 */
ProgramValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
ProgramValidator.attributes = function attributes() {
    return {
        user_id: 'user_id',
        title: 'title',
    };
};