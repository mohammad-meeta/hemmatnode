'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function ResultValidator() {}
module.exports = ResultValidator;

ResultValidator.async = true;

/**
 * Validation funciton
 */
ResultValidator.lang = function lang() {
    return 'fa';
};

/**
 * Validation funciton
 */
ResultValidator.validate = function validate(req, res, next) {

    validator.validate(ResultValidator, req, res, next);
};

/**
 * Data function
 */
ResultValidator.data = function data(req) {
    return {
        user_id: req.session.auth.userId,
        result: req.body.result,
        standard: req.body.standard,
        project_id: req.body.project_id,
        cast: req.body.cast,
        deadline: req.body.deadline
    };
};

/**
 * Rules function
 */
ResultValidator.rules = function rules(req) {
    return {
        'user_id': 'required',
        'result': 'required',
        'standard': 'required',
        'project_id': 'required',
        'cast': 'required',
        'deadline': 'required'
    };
};

/**
 * Messages function
 */
ResultValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
ResultValidator.attributes = function attributes() {
    return {
        user_id: 'user_id',
        result: 'result',
        standard: 'standard',
        project_id: 'project_id',
        cast: 'cast',
        deadline: 'deadline'
    };
};