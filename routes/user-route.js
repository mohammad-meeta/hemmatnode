'use strict';
const validator = use('validators/user-register-validator');
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/user', [
    checkSession,
    Rule.canAsync('user.permision', 'user.index'),
    'User@index'
])
    .as('user.index');

Router.get('/api/users/:page/:size?', [
    checkSession,
    'User@paginateUserData'
])
    .as('api.user');

Router.get('/user/create', [
    checkSession,
    Rule.canAsync('user.permision', 'user.create'),
    'User@create'
])
    .as('user.create');

Router.get('/user/edit', [
    checkSession,
    Rule.canAsync('user.permision', 'user.edit'),
    'User@edit'
])
    .as('user.edit');

Router.post('/user', [
    checkSession,
    Rule.canAsync('user.permision', 'user.store'),
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'files' }]),
    validator.validate,
    'User@store'
])
    .as('user.store');

Router.get('/user/:userData', [
    checkSession,
    Rule.canAsync('user.permision', 'user.show'),
    'User@show'
])
    .as('user.show');

Router.get('/api/user/:userData/edit', [
    checkSession,
    Rule.canAsync('user.permision', 'api.user.edit'),
    'User@editUserData'
])
    .as('api.user.edit');

Router.patch('/user/:id', [
    checkSession,
    Rule.canAsync('user.permision', 'user.update'),
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'files' }]),
    validator.validate,
    'User@update'
])
    .as('user.update');

Router.delete('/user/:userData', [
    checkSession,
    Rule.canAsync('user.permision', 'user.destroy'),
    'User@destroy'
])
    .as('user.destroy');

Router.get('/user/logout', clearAuth)
    .as('user.logout');
