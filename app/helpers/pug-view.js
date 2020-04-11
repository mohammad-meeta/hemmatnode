'use strict';

/**
 * Pug view helper class
 */
function PugView() {}
module.exports = PugView;

/**
 * Get view path by view-name
 */
PugView.getView = function (viewName) {
    return PugView.viewPath[viewName];
};

/** Set view path */
PugView.viewPath = {
    /* Home */
    'home.index': 'pages/home/index.pug',
    'home.about': 'pages/home/about.pug',

    /* Auth */
    'auth.login': 'pages/auth/login.pug',
    'auth.register': 'pages/auth/register.pug',

    /* User */
    'user.index': 'pages/user/index.pug',
    'user.create': 'pages/user/register.pug'
};
