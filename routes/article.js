'use strict';
const validator = use('validators/article-register-validator');
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/article', [
        checkSession,
        Rule.canAsync('user.permision', 'articlet.index'),
        'Article@index'
    ])
    .as('article.index');

Router.get('/api/articles/:page/:size?', [
        checkSession,
        Rule.canAsync('user.permision', 'api.article'),
        'Article@paginateArticleData'
    ])
    .as('api.article');

Router.get('/article/create', [
        checkSession,
        Rule.canAsync('user.permision', 'article.create'),
        'Article@create'
    ])
    .as('article.create');

Router.get('/article/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'article.edit'),
        'Article@edit'
    ])
    .as('article.edit');

Router.post('/article', [
        checkSession,
        Rule.canAsync('user.permision', 'article.store'),
        validator.validate,
        'Article@store'
    ])
    .as('article.store');

Router.get('/article/:articleData', [
        checkSession,
        Rule.canAsync('user.permision', 'article.show'),
        'Article@show'
    ])
    .as('article.show');


Router.get('/api/article/:articleData/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'api.article.edit'),
        'Article@editArticleData'
    ])
    .as('api.article.edit');

Router.patch('/article/:articleData', [
        checkSession,
        Rule.canAsync('user.permision', 'article.update'),
        'Article@update'
    ])
    .as('article.update');

Router.delete('/article/:articleData', [
        checkSession,
        Rule.canAsync('user.permision', 'article.destroy'),
        'Article@destroy'
    ])
    .as('article.destroy');