'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function ProjectValidator() {}
module.exports = ProjectValidator;

ProjectValidator.async = true;

/**
 * Validation funciton
 */
ProjectValidator.lang = function lang() {
    return 'fa';
};

/**
 * Validation funciton
 */
ProjectValidator.validate = function validate(req, res, next) {

    validator.validate(ProjectValidator, req, res, next);
};

/**
 * Data function
 */
ProjectValidator.data = function data(req) {
    return {
        user_id: req.session.auth.userId,
        weight: req.body.weight,
        description: req.body.description,
        title: req.body.title,
    };
};

/**
 * Rules function
 */
ProjectValidator.rules = function rules(req) {
    return {
        'user_id': 'required',
        'title': 'required',
        'weight': 'required',
        'description': 'required',
    };
};

/**
 * Messages function
 */
ProjectValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
ProjectValidator.attributes = function attributes() {
    return {
        user_id: 'user_id',
        weight: 'weight',
        description: 'description',
        title: 'title',
    };
};