'use strict';

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/user', [
    checkAuth,
    global.csrf,
    'User@index'
])
    .as('user.index');

Router.get('/user/create', [
    checkAuth,
    global.csrf,
    'User@create'
])
    .as('user.create');

Router.post('/user', [
    checkAuth,
    global.csrf,
    'User@store'
])
    .as('user.store');


Router.get('/user/logout', clearAuth)
    .as('user.logout');
