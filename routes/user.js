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

Router.get('/user/logout', clearAuth)
    .as('user.logout');
