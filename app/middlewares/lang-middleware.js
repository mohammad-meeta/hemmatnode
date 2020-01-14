'use strict';

/**
 * Test middleware
 */
module.exports = function TestMiddleware(req, res, next) {
    req.lang = req.params.lang || req.query.lang || 'en';

    next();
};