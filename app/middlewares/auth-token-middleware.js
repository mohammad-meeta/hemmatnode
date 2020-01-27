'use strict';

const AuthHelper = use('core/helpers/auth-helper');

/**
 * Test middleware
 */
module.exports = function AuthTokenMiddleware(req, res, next) {
    AuthHelper.extractAuth(req);
    next();
};
