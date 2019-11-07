'use strict';

Router.get('/auth/login', 'AuthController@login')
    .as('auth.login');
