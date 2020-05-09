'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function DocumentValidator() {}
module.exports = DocumentValidator;

DocumentValidator.async = true;

/**
 * Validation funciton
 */
DocumentValidator.lang = function lang() {
    return 'fa';
};

/**
 * Validation funciton
 */
DocumentValidator.validate = function validate(req, res, next) {

    validator.validate(DocumentValidator, req, res, next);
};

/**
 * Data function
 */
DocumentValidator.data = function data(req) {
    return {
        user_id: req.session.auth.userId,
        title: req.body.title,
        body: req.body.body,
        document_type_id: req.body.document_type_id
    };
};

/**
 * Rules function
 */
DocumentValidator.rules = function rules(req) {
    return {
        'user_id': 'required',
        'title': 'required',
        'body': 'required',
        'document_type_id': 'required'
    };
};

/**
 * Messages function
 */
DocumentValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
DocumentValidator.attributes = function attributes() {
    return {
        user_id: 'user_id',
        title: 'title',
        body: 'body',
        document_type_id: 'document_type_id'
    };
};