'use strict';

const {
    checkAuth
} = use('core/helpers/auth-helper');

Router.get('/user', [
        checkAuth,
        'UserController@index'
    ])
    .as('user.index');