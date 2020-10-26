'use strict';

window.moment = require("moment");
window.momentJalaali = require("moment-jalaali");

/**
 * DateHelper
 */
function DateHelper(){}
module.exports = DateHelper;

//
// To Persian Date
//
DateHelper.toPersianDate = function toPersianDate(value, format, locale) {
    if (!value) {
        return '';
    }

    return momentJalaali(value)
        .locale(locale || 'fa')
        .format(format || 'jYYYY/jMM/jDD');
};

//
// To Persian Date
//
DateHelper.toPersianDateLong = function toPersianDateLong(value, locale) {
    return DateHelper.toPersianDate(value, 'jYYYY-jMM-jDD HH:mm:SS', locale);
};

//
// To Persian Date short
//
DateHelper.toPersianDateShort = function toPersianDateShort(value, locale) {
    return DateHelper.toPersianDate(value, 'jYYYY-jMM-jDD', locale);
};

//
// To Persian Date year
//
DateHelper.toPersianDateYear = function toPersianDateYear(value, locale) {
    return DateHelper.toPersianDate(value, 'jYYYY', locale);
};
