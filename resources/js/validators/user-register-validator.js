'use strict';

/**
 * User Register Validator
 */
function UserRegisterValidator() {}
module.exports = UserRegisterValidator;

/**
 * Validation funciton
 */
UserRegisterValidator.validate = function validate(data) {
    const BaseValidator = require('JS-VALIDATORS/base-validator');

    const rules = {
        name: 'required|min:3|max:25',
        email: 'required|email',
        password: 'required|min:6|confirmed',
        firstName: 'required',
        lastName: 'required',
        nationCode: 'required|nationCode',
        cellphone: 'required|cellphone'
    };
    let options = {
        lang : "fa",
        attributes : {
            name: 'نام کاربری',
            email: 'پست الکترونیک',
            password: 'گذرواژه',
            firstName: 'نام',
            lastName: 'نام خانوادگی',
            nationCode: 'کد ملی',
            cellphone: 'شماره موبایل'
        }
    };
    return BaseValidator.validate(data, rules, options);
};

