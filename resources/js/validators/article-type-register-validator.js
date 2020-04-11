'use strict';

/**
 * Article Type Register Validator
 */
function ArticleTypeRegisterValidator() {}
module.exports = ArticleTypeValidator;

/**
 * Validation funciton
 */
ArticleTypeValidator.validate = function validate(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');
    const rules = {
        title: 'required',
    };

    return BaseValidator.validate(data, rules);
};
