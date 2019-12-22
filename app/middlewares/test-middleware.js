'use strict';

/**
 * Test middleware
 */
module.exports = function TestMiddleware(req, res, next) {
    console.log("Test middleware", new Date());

    next();
};