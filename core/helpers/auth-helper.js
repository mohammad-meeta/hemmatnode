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