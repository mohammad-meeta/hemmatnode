'use strict';
const validator = use('validators/article-type-register-validator');
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/article-type', [
        checkSession,
        Rule.canAsync('user.permision', 'articletype.index'),
        'ArticleType@index'
    ])
    .as('articletype.index');

Router.get('/api/article-types/:page/:size?', [
        checkSession,
        Rule.canAsync('user.permision', 'api.articletype'),
        'ArticleType@paginateArticleTypeData'
    ])
    .as('api.articletype');


Router.get('/article-type/create', [
        checkSession,
        Rule.canAsync('user.permision', 'articletype.create'),
        'ArticleType@create'
    ])
    .as('articletype.create');

Router.get('/article-type/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'articletype.edit'),
        'ArticleType@edit'
    ])
    .as('articletype.edit');


Router.post('/article-type', [
        checkSession,
        Rule.canAsync('user.permision', 'articletype.store'),
        validator.validate,
        'ArticleType@store'
    ])
    .as('articletype.store');

Router.get('/article-type/:articleTypeData', [
        checkSession,
        Rule.canAsync('user.permision', 'articletype.show'),
        'ArticleType@show'
    ])
    .as('articletype.show');

Router.get('/api/article-type/:articleTypeData/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'api.articletype.edit'),
        'ArticleType@editArticleTypeData'
    ])
    .as('api.articletype.edit');

Router.patch('/article-type/:articleTypeData', [
        checkSession,
        Rule.canAsync('user.permision', 'articletype.update'),
        validator.validate,
        'ArticleType@update'
    ])
    .as('articletype.update');

Router.delete('/article-type/:articleTypeData', [
        checkSession,
        Rule.canAsync('user.permision', 'articletype.destroy'),
        'ArticleType@destroy'
    ])
    .as('articletype.destroy');