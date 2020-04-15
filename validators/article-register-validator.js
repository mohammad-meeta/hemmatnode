'use strict';

const validator = use('core/helpers/data-validator');
const Validator = require('validatorjs');

/**
 * ArticleType Login Validator
 */
function ArticleRegisterValidator() { }
module.exports = ArticleRegisterValidator;

ArticleRegisterValidator.async = true;

/**
 * Validation funciton
 */
ArticleRegisterValidator.validate = function validate(req, res, next) {

    validator.validate(ArticleRegisterValidator, req, res, next);
};

/**
 * Data function
 */
ArticleRegisterValidator.data = function data(req) {
    return {
        title: req.body.title,
        type: req.body.type,
        body: req.body.body,
        user: req.body.user
    };
};

/**
 * Rules function
 */
ArticleRegisterValidator.rules = function rules() {
    return {
        'title': 'required',
        'body': 'required',
        'user': 'required|user_id_available',
        'type': 'required|article_type_available'
    };
};

/**
 * Messages function
 */
ArticleRegisterValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
ArticleRegisterValidator.attributes = function attributes() {
    return {
        title: 'title',
        body: 'body',
        user: 'user',
        type: 'type',
    };
};
