'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function MemorandumValidator() {}
module.exports = MemorandumValidator;

MemorandumValidator.async = true;

/**
 * Validation funciton
 */
MemorandumValidator.lang = function lang() {
    return 'fa';
};

/**
 * Validation funciton
 */
MemorandumValidator.validate = function validate(req, res, next) {

    validator.validate(MemorandumValidator, req, res, next);
};

/**
 * Data function
 */
MemorandumValidator.data = function data(req) {
    return {
        title: req.body.title,
        user_id: req.session.auth.userId,
        body: req.body.body,
        date: req.body.date,
        department_id: req.body.department_id
    };
};

/**
 * Rules function
 */
MemorandumValidator.rules = function rules(req) {
    return {
        'title': 'required',
        'user_id': 'required',
        'body': 'required',
        'date': 'required',
        'department_id': 'required'
    };
};

/**
 * Messages function
 */
MemorandumValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
MemorandumValidator.attributes = function attributes() {
    return {
        title: 'title',
        user_id: 'userId',
        body: 'body',
        date: 'date',
        department_id: 'department_id'
    };
};
