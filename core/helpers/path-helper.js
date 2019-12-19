'use strict';

/**
 * Path helper class
 */
function PathHelper() {}
module.exports = PathHelper;

/**
 * Apply params function
 */
PathHelper.applyParams = function applyParams(path, params) {
    const pathParams = [];
    const regex = /(\:(\w*)\??)/gm;
    let m;

    while ((m = regex.exec(path)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        pathParams.push({
            'param': m[1],
            'key': m[2]
        });
    }

    /* Search and replace in path */
    let result = path;
    pathParams.forEach(pathParam => {
        const paramRegexp = new RegExp(pathParam.param + "\\??", "g");
        const key = pathParam.key;

        result = result.replace(paramRegexp, params[key] || '');
    });

    /* Remove last '/' sign */
    result = result.replace(/\/$/g, '');

    return result;
};
