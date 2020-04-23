'use strict';

const {
    checkSession
} = use('app/helpers/auth-helper');

Router.get('/', [
        checkSession,
        'Home@index'
    ])
    .as('home.index');

Router.get('/about', [
        checkSession,
        'Home@about'
    ])
    .as('home.about');