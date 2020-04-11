'use strict';

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/user', [
    checkAuth,
    'User@index'
])
    .as('user.index');

Router.get('/user/create', [
    checkAuth,
    'User@create'
])
    .as('user.create');

Router.post('/user', [
    checkAuth,
    'User@store'
])
    .as('user.store');


Router.get('/user/logout', clearAuth)
    .as('user.logout');
