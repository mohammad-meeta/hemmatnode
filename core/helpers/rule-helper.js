'use strict';

/**
 * Rule Helper class
 */
function RuleHelper() {}
module.exports = RuleHelper;


/* Contants */
RuleHelper.BASE_PATH = 'rules';
RuleHelper.SUFFIX = '-rule';

/**
 * Can function
 */
RuleHelper.can = function can(module, data, method = 'can') {
    if (! module.contains(RuleHelper.SUFFIX)){
        module += RuleHelper.SUFFIX;
    }

    const Rule = use(RuleHelper.BASE_PATH, module);

    return Rule[method](data);
};
