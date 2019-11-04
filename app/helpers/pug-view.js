'use strict';

/**
 * Pug view helper class
 */
function PugView() { }
module.exports = PugView;

/**
 * Get view path by view-name
 */
PugView.getView = function (viewName) {
    return PugView.viewPath[viewName];
};

/** Set view path */
PugView.viewPath = {
    'home/index': 'pages/home/index.pug',
    'auth/login': 'pages/auth/login.pug'
};
