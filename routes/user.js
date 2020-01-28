'use strict';

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/user', [
        checkAuth,
        'UserController@index'
    ])
    .as('user.index');

Router.get('/user/logout', clearAuth)
    .as('user.logout');
