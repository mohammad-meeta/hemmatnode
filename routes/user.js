'use strict';
const validator = use('validators/user-register-validator');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/user', [
    // checkAuth,
    'User@index'
])
    .as('user.index');

Router.get('/api/user/:page/:pageSize?', [
    // checkAuth,
    'User@paginateUserData'
])
    .as('api.user');


Router.get('/user/create', [
    // checkAuth,
    'User@create'
])
    .as('user.create');

Router.post('/user', [
    // checkAuth,
    validator.validate,
    'User@store'
])
    .as('user.store');

Router.get('/user/:userData', [
    // checkAuth,
    'User@show'
])
    .as('user.show');

Router.get('/user/edit', [
    // checkAuth,
    'User@edit'
])
    .as('user.edit');


Router.get('/api/user/:userData/edit', [
    // checkAuth,
    validator.validate,
    'User@editUserData'
])
    .as('api.user.edit');

Router.patch('/user/:userData', [
    // checkAuth,
    'User@update'
])
    .as('user.update');

Router.delete('/user/:userData', [
    // checkAuth,
    'User@destroy'
])
    .as('user.destroy');

Router.get('/user/logout', clearAuth)
    .as('user.logout');
