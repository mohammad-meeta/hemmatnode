'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function DepartmentCategoryValidator() {}
module.exports = DepartmentCategoryValidator;

DepartmentCategoryValidator.async = true;

/**
 * Validation funciton
 */
DepartmentCategoryValidator.lang = function lang() {
    return 'fa';
};

/**
 * Validation funciton
 */
DepartmentCategoryValidator.validate = function validate(req, res, next) {

    validator.validate(DepartmentCategoryValidator, req, res, next);
};

/**
 * Data function
 */
DepartmentCategoryValidator.data = function data(req) {
    return {
        user_id: req.session.auth.userId,
        title: req.body.title
    };
};

/**
 * Rules function
 */
DepartmentCategoryValidator.rules = function rules(req) {
    return {
        'user_id': 'required',
        'title': 'required'
    };
};

/**
 * Messages function
 */
DepartmentCategoryValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
DepartmentCategoryValidator.attributes = function attributes() {
    return {
        user_id: 'user_id',
        title: 'title'
    };
};