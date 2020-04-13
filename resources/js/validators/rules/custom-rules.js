'use strict';

const Validator = require("validatorjs");

Validator.register('cellphone',
    (value, requirement, attribute) =>
    ('' + value).toString().match(/(09\d{9})|(\+989\d{9})/),
    'شماره همراه باید با فرمت درست مانند (09121234567) باشد.');

Validator.register('nationCode',
    (value, requirement, attribute) =>
    ('' + value).toString().match(/^\d{10}/),
    'کد ملی را 10 رقم و به صورت دقیق وارد نمایید.');
