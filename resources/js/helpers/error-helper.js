'use strict';

/**
 * Page Helper
 */
function ErrorHelper() {}
module.exports = ErrorHelper;

/**
 * Convert errors object to string
 */
ErrorHelper.getErrorText = function getErrorText(errors) {
    let result = Object.keys(errors)
        .map(err => errors[err].join("\n"))
        .join("\n");

    return result;
};
