'use strict';

const validator = use('core/helpers/data-validator');
const Validator = require('validatorjs');

/**
 * ArticleType Login Validator
 */
function ArticleTypeRegisterValidator() { }
module.exports = ArticleTypeRegisterValidator;

ArticleTypeRegisterValidator.async = true;

/**
 * Validation funciton
 */
ArticleTypeRegisterValidator.validate = function validate(req, res, next) {

    validator.validate(ArticleTypeRegisterValidator, req, res, next);
};

/**
 * Data function
 */
ArticleTypeRegisterValidator.data = function data(req) {
    return {
        title: req.body.title,
        user_id: req.body.user_id,
    };
};

/**
 * Rules function
 */
ArticleTypeRegisterValidator.rules = function rules() {
    return {
        'title': 'required|articletype_title_available',
        'user_id': 'required|user_id_available'
    };
};

/**
 * Messages function
 */
ArticleTypeRegisterValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
ArticleTypeRegisterValidator.attributes = function attributes() {
    return {
        title: 'title',
        user_id: 'user_id',
    };
};
