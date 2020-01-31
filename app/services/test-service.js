'use strict';

/**
 * Test Service
 */
function TestService() {}
module.exports = TestService;

/**
 * Boot function
 */
TestService.boot = function boot(server) {
    return new Promise((resolve, reject) => {
        console.log("Test Service is started");

        resolve();
    })
};
