'use strict';

const qs = require('qs');

function PageHelper() {}
module.exports = PageHelper;


/**
 * Redirect to url
 *
 * @param      {String}  url     The url
 * @param      {Array}  args     The Args
 */
PageHelper.redirect = function redirect(url, args, replace) {
    if (null != args) {
        url += qs.stringify(args);
    }

    if (replace == true) {
        window.location.replace = url;
    }
    else {
        window.location.href = url;
    }

    return url;
}
