'use strict';

Router.get('/user', 'UserController@index')
    .as('user.index');
