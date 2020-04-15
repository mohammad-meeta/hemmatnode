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
    /* Home */
    'home.index': 'pages/home/index.pug',
    'home.about': 'pages/home/about.pug',

    /* Auth */
    'auth.login': 'pages/auth/login.pug',

    /* User */
    'user.index': 'pages/user/index.pug',
    'user.create': 'pages/user/register.pug',
    'user.show': 'pages/user/show.pug',
    'user.edit': 'pages/user/edit.pug',

    /* articletype */
    'articletype.index': 'pages/articletype/index.pug',
    'articletype.create': 'pages/articletype/register.pug',
    'articletype.show': 'pages/articletype/show.pug',
    'articletype.edit': 'pages/articletype/edit.pug',

    /* article*/
    'article.index': 'pages/article/index.pug',
    'article.create': 'pages/article/register.pug',
    'article.show': 'pages/article/show.pug',
    'article.edit': 'pages/article/edit.pug'
};
