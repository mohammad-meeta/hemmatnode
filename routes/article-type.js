'use strict';
const validator = use('validators/article-type-register-validator');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/article-type', [
    // checkAuth,
    'ArticleType@index'
])
    .as('articletype.index');

Router.get('/api/article-type/:page/:size?', [
    // checkAuth,
    'ArticleType@paginateArticleTypeData'
])
    .as('api.articletype');


Router.get('/article-type/create', [
    // checkAuth,
    'ArticleType@create'
])
    .as('articletype.create');

Router.post('/article-type', [
    // checkAuth,
    validator.validate,
    'ArticleType@store'
])
    .as('articletype.store');

Router.get('/article-type/:articleTypeData', [
    // checkAuth,
    'ArticleType@show'
])
    .as('articletype.show');

Router.get('/article-type/edit', [
    // checkAuth,
    'ArticleType@edit'
])
    .as('articletype.edit');


Router.get('/api/user/:articleTypeData/edit', [
    // checkAuth,
    validator.validate,
    'ArticleType@editArticleTypeData'
])
    .as('api.articletype.edit');

Router.patch('/article-type/:articleTypeData', [
    // checkAuth,
    'ArticleType@update'
])
    .as('articletype.update');

Router.delete('/article-type/:articleTypeData', [
    // checkAuth,
    'ArticleType@destroy'
])
    .as('articletype.destroy');
