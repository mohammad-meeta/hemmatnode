'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function DocumentTypeValidator() {}
module.exports = DocumentTypeValidator;

DocumentTypeValidator.async = true;

/**
 * Validation funciton
 */
DocumentTypeValidator.lang = function lang() {
    return 'fa';
};

/**
 * Validation funciton
 */
DocumentTypeValidator.validate = function validate(req, res, next) {

    validator.validate(DocumentTypeValidator, req, res, next);
};

/**
 * Data function
 */
DocumentTypeValidator.data = function data(req) {
    return {
        user_id: req.session.auth.userId,
        title: req.body.title,
        date: req.body.date,
        score: req.body.score,
    };
};

/**
 * Rules function
 */
DocumentTypeValidator.rules = function rules(req) {
    return {
        'user_id': 'required',
        'title': 'required',
        'date': 'required',
        'score': 'required|numeric'
    };
};

/**
 * Messages function
 */
DocumentTypeValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
DocumentTypeValidator.attributes = function attributes() {
    return {
        user_id: 'user_id',
        title: 'title',
        date: 'date',
        score: 'score'
    };
};