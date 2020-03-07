'use strict';

/**
 * Error Helper class
 */
function ErrorHelper() {}
module.exports = ErrorHelper;

/**
 * Call stack function
 */
ErrorHelper.callStack = function callStack() {
    var obj = {};

    Error.captureStackTrace(obj, ErrorHelper.callStack);
    
    return obj.stack;
};
