'use strict';

/**
 * Login Handler class
 */
function LoginHandler() {}
module.exports = LoginHandler;

/**
 * Run Handler function
 */
LoginHandler.run = function run(payload) {
    console.log('TEST-ATTEMPT:', payload);
};
