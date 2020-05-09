'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function DepartmentValidator() {}
module.exports = DepartmentValidator;

DepartmentValidator.async = true;

/**
 * Validation funciton
 */
DepartmentValidator.lang = function lang() {
    return 'fa';
};

/**
 * Validation funciton
 */
DepartmentValidator.validate = function validate(req, res, next) {

    validator.validate(DepartmentValidator, req, res, next);
};

/**
 * Data function
 */
DepartmentValidator.data = function data(req) {
    return {
        user_id: req.session.auth.userId,
        title: req.body.title,
        department_category_id: req.body.department_category_id
    };
};

/**
 * Rules function
 */
DepartmentValidator.rules = function rules(req) {
    return {
        'user_id': 'required',
        'title': 'required',
        'department_category_id': 'required'
    };
};

/**
 * Messages function
 */
DepartmentValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
DepartmentValidator.attributes = function attributes() {
    return {
        user_id: 'user_id',
        title: 'title',
        department_category_id: 'department_category_id'
    };
};