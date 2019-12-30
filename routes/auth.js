'use strict';

Router.get('/auth/login', 'AuthController@login')
    .as('auth.login');

Router.post('/auth/login', 'AuthController@attempt')
    .as('auth.attempt');

Router.get('/auth/test', 'AuthController@test');