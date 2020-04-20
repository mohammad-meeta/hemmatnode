'use strict';

const createError = require('http-errors');

/**
 * User-rule class
 */
function Rule() {}
module.exports = Rule;

/**
 * Can function
 *
 * @param      {Object}   payload  The payload
 * @return     {boolean}  User can/can't do action
 */
Rule.can = function can(ruleName, data) {
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
        const user = req.user;
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
Rule.canAsync = function canAsync(ruleName, data) {
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
        const user = req.user;
        RuleModule.check(user, data)
            .then(result => {
                console.log(reuslt)

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
