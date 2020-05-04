'use strict';

/**
 * User Register Validator
 */
function DepartmentCategoryValidator() {}
module.exports = DepartmentCategoryValidator;

/**
 * Validation funciton
 */
DepartmentCategoryValidator.validate = function validate(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');

    const rules = {
        title: 'required|min:3|max:255'
    };
    let options = {
        lang : "fa",
        attributes : {
            title: 'عنوان'
        }
    };
    return BaseValidator.validate(data, rules, options);
};
/**
 * Validation edit funciton
 */
UserRegisterValidator.validateEdit = function validateEdit(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');

    const rules = {
        title: 'required|min:3|max:255',
    };
    let options = {
        lang : "fa",
        attributes : {
            title: 'عنوان'
        }
    };
    return BaseValidator.validate(data, rules, options);
};

