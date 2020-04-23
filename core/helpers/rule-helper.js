'use strict';

const _ = require('lodash');
const createError = require('http-errors');

/**
 * User-rule class
 */
function Rule() {}
module.exports = Rule;

/* Default values */
Rule.authToken = config('app', 'auth_token');

/**
 * Get auth token
 */
Rule.getAuthToken = function getAuthToken(req, authToken) {
    const tokenName = authToken || Rule.authToken || 'auth';
    const token = _.get(req, tokenName, null);

    return token;
};

/**
 * Can function
 *
 * @param      {Object}   payload  The payload
 * @return     {boolean}  User can/can't do action
 */
Rule.can = function can(ruleName, data, authToken) {
    /* Prepare ruleName for loading from sub-folders */
    ruleName = ruleName.replace(/\./g, '\/');

    if (!ruleName.endsWith('-rule')) {
        ruleName += '-rule';
    }

    ruleName = `rules/${ruleName}`;

    /* Try to laod rule-module */
    const RuleModule = use(ruleName);

    /* Return check function */
    return (req, res, next) => {
        const user = Rule.getAuthToken(req, authToken);
        const result = RuleModule.check(user, data);

        if (result) {
            next();
        } else {
            next(createError(403));
        }
    }
};

/**
 * Can-Async function
 *
 * @param      {Object}   payload  The payload
 * @return     {boolean}  User can/can't do action
 */
Rule.canAsync = function canAsync(ruleName, data, authToken) {
    /* Prepare ruleName for loading from sub-folders */
    ruleName = ruleName.replace(/\./g, '\/');

    if (!ruleName.endsWith('-rule')) {
        ruleName += '-rule';
    }

    ruleName = `rules/${ruleName}`;

    /* Try to laod rule-module */
    const RuleModule = use(ruleName);

    /* Return check function */
    return (req, res, next) => {
        const user = Rule.getAuthToken(req, authToken);

        RuleModule.check(user, data)
            .then(result => {
                if (result) {
                    next();
                } else {
                    next(createError(403));
                }
            })
            .catch(err => {
                next(err);
            })

    }
};