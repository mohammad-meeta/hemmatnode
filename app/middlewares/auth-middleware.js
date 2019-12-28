'use strict';

const AuthHelper = use('core/helpers/auth-helper');

/**
 * Auth middleware
 */
module.exports = function AuthMiddleware(req, res, next) {
    let authorization = req.headers.authorization || '';
    authorization = authorization.split(' ');

    if (!authorization ||
        (authorization.length < 2) ||
        (authorization.length[0].toLowerCase() != 'bearer')) {
        const err = {
            message: 'Missing Authorization Header'
        };

        return res.status(401)
            .json(err)
            .end();
    }

    const token = authorization[1];
    const tokenData = AuthHelper.verify(token);

    req.user = tokenData;

    next();
};