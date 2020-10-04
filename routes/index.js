'use strict';
const Rule = use('core/helpers/rule-helper');
// const validator = use('validators/index-register-validator');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/index', [
    checkSession,
    Rule.canAsync('user.permision', 'index.index'),
    'Index@index'
])
    .as('index.index');

Router.get("/api/indexs/:type/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.index"),
    "Index@paginateIndex"
]).as("api.index");

Router.get("/api/all/indexs/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.all.index"),
    "Index@paginateIndexAll"
]).as("api.all.index");

Router.get('/index/create', [
    checkSession,
    Rule.canAsync('user.permision', 'index.create'),
    'Index@create'
])
    .as('index.create');

Router.post('/index', [
    checkSession,
    Rule.canAsync('user.permision', 'index.store'),
    // validator.validate,
    'Index@store'
])
    .as('index.store');

Router.patch("/index/:id/edit", [
    checkSession,
    Rule.canAsync("user.permision", "index.update"),
    // validator.validate,
    "Index@update"
]).as("index.update");

Router.get('/index/:index', [
    checkSession,
    Rule.canAsync('user.permision', 'index.show'),
    'Index@show'
])
    .as('index.show');

Router.delete('/index/:index', [
    checkSession,
    Rule.canAsync('user.permision', 'index.destroy'),
    'Index@destroy'
])
    .as('index.destroy');
