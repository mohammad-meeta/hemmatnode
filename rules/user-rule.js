'use strict';

/**
 * User-rule class
 */
function UserRule() {}
module.exports = UserRule;

/**
 * Can read function
 *
 * @param      {Object}   payload  The payload
 * @return     {boolean}  User can/can't do action
 */
UserRule.can = function can(payload) {
    return true;
};
