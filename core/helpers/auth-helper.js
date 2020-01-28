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
AuthHelper.sign = function sign(payload, userOptions = {}) {
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
 * Check token
 */
AuthHelper.checkAuth = function checkAuth(req, res, next) {
    AuthHelper.extractAuth(req);

    /* Check token data */
    if (null == req.user) {
        const err = {
            message: 'Authorization header missing'
        };

        if (isAjax(req)) {
            res.status(401)
                .json(err)
                .end();
        } else {
            res.redirect(route(authConfig.loginRoute));
        }
    } else {
        return next();
    }
};

/**
 * Check token
 */
AuthHelper.clearAuth = function checkAuth(req, res, next) {
    res.cookie('token', null, authConfig.cookie.options);

    if (isAjax(req)) {
        res.status(200)
            .send({
                success: true,
                data: route(authConfig.loginRoute)
            })
            .end();
    } else {
        res.redirect(route(authConfig.loginRoute))
            .end();
    }
};

/**
 * Extract auth data
 *
 * @param      {Object}  req     The request
 */
AuthHelper.extractAuth = function extractAuth(req) {
    let token;
    let authorization = req.headers.authorization;

    /* Check header */
    if (authorization) {
        authorization = authorization.split(' ');

        if (authorization &&
            (authorization.length > 1) &&
            (authorization[0].toLowerCase() == 'bearer')) {

            token = authorization[1];
        }
    }
    /* Try to check cookie */
    else {
        // token = req.cookies['token'];    /* for unsigned cookies */
        token = req.signedCookies['token'];
    }

    /* Verify token */
    try {
        const tokenData = AuthHelper.verify(token);

        req.user = tokenData;
    } catch (error) {
        delete req.user;
    }
};
