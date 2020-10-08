'use strict';

/**
 * Monitoring Register Validator
 */
function MonitoringValidator() {}
module.exports = MonitoringValidator;

/**
 * Validation funciton
 */
MonitoringValidator.validate = function validate(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');

    const rules = {
        value: 'required'
    };
    let options = {
        lang : "fa",
        attributes : {
            value: 'عنوان'
        }
    };
    return BaseValidator.validate(data, rules, options);
};
/**
 * Validation edit funciton
 */
MonitoringValidator.validateEdit = function validateEdit(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');

    const rules = {
        value: 'required',
    };
    let options = {
        lang : "fa",
        attributes : {
            value: 'مقدار'
        }
    };
    return BaseValidator.validate(data, rules, options);
};

