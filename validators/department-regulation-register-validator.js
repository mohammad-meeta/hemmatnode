'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function DepartmentRegulationValidator() {}
module.exports = DepartmentRegulationValidator;

DepartmentRegulationValidator.async = true;

/**
 * Validation funciton
 */
DepartmentRegulationValidator.lang = function lang() {
    return 'fa';
};

/**
 * Validation funciton
 */
DepartmentRegulationValidator.validate = function validate(req, res, next) {

    validator.validate(DepartmentRegulationValidator, req, res, next);
};

/**
 * Data function
 */
DepartmentRegulationValidator.data = function data(req) {
    return {
        user_id: req.session.auth.userId,
        title: req.body.title,
        department_id: req.body.department_id
    };
};

/**
 * Rules function
 */
DepartmentRegulationValidator.rules = function rules(req) {
    return {
        'user_id': 'required',
        'title': 'required',
        'department_id': 'required'
    };
};

/**
 * Messages function
 */
DepartmentRegulationValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
DepartmentRegulationValidator.attributes = function attributes() {
    return {
        user_id: 'user_id',
        title: 'title',
        department_id: 'department_id'
    };
};