'use strict';

/**
 * Lang middleware
 */
module.exports = function LangMiddleware(req, res, next) {
    req.lang = req.params.lang || req.query.lang || 'en';

    next();
};
