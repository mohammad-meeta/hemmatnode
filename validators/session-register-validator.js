'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function SessionValidator() {}
module.exports = SessionValidator;

SessionValidator.async = true;

/**
 * Validation funciton
 */
SessionValidator.lang = function lang() {
    return 'fa';
};

/**
 * Validation funciton
 */
SessionValidator.validate = function validate(req, res, next) {

    validator.validate(SessionValidator, req, res, next);
};

/**
 * Data function
 */
SessionValidator.data = function data(req) {
    return {
        user_id: req.session.auth.userId,
        title: req.body.title,
        body: req.body.body,
        user_list: req.body.user_list,
        other_user: req.body.other_user,
        date: req.body.date,
        document_id: req.body.document_id,
        department_id: req.body.department_id
    };
};

/**
 * Rules function
 */
SessionValidator.rules = function rules(req) {
    return {
        'user_id': 'required',
        'title': 'required',
        'body': 'required',
        'user_list': 'required|array',
        'date': 'required',
        'other_user': 'array',
        'document_id': 'required',
        'department_id': 'required'
    };
};

/**
 * Messages function
 */
SessionValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
SessionValidator.attributes = function attributes() {
    return {
        user_id: 'userId',
        title: 'title',
        body: 'body',
        user_list: 'user_list',
        other_user: 'other_user',
        date: 'date',
        document_id: 'document_id',
        department_id: 'department_id'
    };
};