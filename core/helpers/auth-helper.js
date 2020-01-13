'use strict';

const _ = require('lodash');
const uuidV1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const authConfig = use('config/auth');

/**
 * Auth Helper
 */
function AuthHelper() {}
module.exports = AuthHelper;

/* Consts */
AuthHelper.algorithm = 'RS256';
AuthHelper.expiresIn = '30m';
AuthHelper.issuer = 'OjvarLand';
AuthHelper.subject = 'Sunset Framework';
AuthHelper.audience = 'sunset@ojvarland.org';
AuthHelper.exceptions = {};

/**
 * Add exceptions
 */
AuthHelper.addException = function addException(path) {
    AuthHelper.exceptions[path] = true;
}

/**
 * Sign and generate a JWT token
 */
AuthHelper.sign = function sign(payload, userOptions) {
    let options = _.merge({
        algorithm: AuthHelper.algorithm,
        expiresIn: AuthHelper.expiresIn,
        issuer: AuthHelper.issuer,
        subject: AuthHelper.subject,
        audience: AuthHelper.audience,
        jwtid: uuidV1()
    }, userOptions);

    const jwtToken = jwt.sign(payload, authConfig.jwt.privateKey, options);

    return jwtToken;
};

/**
 * verify a generated JWT token
 */
AuthHelper.verify = function verify(token, userOptions) {
    let options = _.merge({
        algorithm: [AuthHelper.algorithm],
        expiresIn: AuthHelper.expiresIn,
        issuer: AuthHelper.issuer,
        subject: AuthHelper.subject,
        audience: AuthHelper.audience,
    }, userOptions);

    const legit = jwt.verify(token, authConfig.jwt.publicKey, options);

    return legit;
};

/**
 * Get token
 */
AuthHelper.checkAuth = function checkAuth(req, res, next) {
    let authorization = req.headers.authorization || '';
    authorization = authorization.split(' ');

    if (!authorization ||
        (authorization.length < 2) ||
        (authorization.length[0].toLowerCase() != 'bearer')) {
        const err = {
            message: 'Missing Authorization Header'
        };

        res.status(401)
            .json(err)
            .end();

        return next();
    }

    try {
        const token = authorization[1];
        const tokenData = AuthHelper.verify(token);

        req.user = tokenData;
    } catch (error) {
        delete req.user;

        return next(error);
    }

    return next();
};