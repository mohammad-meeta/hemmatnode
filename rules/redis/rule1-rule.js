'use strict';

/**
 * Rule
 */
function Rule() {}
module.exports = Rule;

/**
 * Check data
 */
Rule.check = function check(user, data) {
    Logger.debug("This is a test rule for redis route, it return true");
    
    return false;
};
