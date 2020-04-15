'use strict';
const validator = use('validators/article-register-validator');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/article', [
    // checkAuth,
    'Article@index'
])
    .as('article.index');

Router.get('/api/articles/:page/:size?', [
    // checkAuth,
    'Article@paginateArticleData'
])
    .as('api.article');


Router.get('/article/create', [
    // checkAuth,
    'Article@create'
])
    .as('article.create');

Router.post('/article', [
    // checkAuth,
    validator.validate,
    'Article@store'
])
    .as('article.store');

Router.get('/article/:articleData', [
    // checkAuth,
    'Article@show'
])
    .as('article.show');

Router.get('/article/edit', [
    // checkAuth,
    'Article@edit'
])
    .as('article.edit');


Router.get('/api/article/:articleData/edit', [
    // checkAuth,
    'Article@editArticleData'
])
    .as('api.article.edit');

Router.patch('/article/:articleData', [
    // checkAuth,
    'Article@update'
])
    .as('article.update');

Router.delete('/article/:articleData', [
    // checkAuth,
    'Article@destroy'
])
    .as('article.destroy');
