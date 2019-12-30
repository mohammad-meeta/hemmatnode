'use strict';

/**
 * Test middleware
 */
module.exports = function TestMiddleware(req, res, next) {
    next();
};