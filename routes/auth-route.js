'use strict';
const {
    checkSession
} = use('app/helpers/auth-helper');
const validator = use('validators/user-login-validator');
const authHelper = use('core/helpers/auth-helper');

Router.get('/auth/login', [
        global.csrf,
        'Auth@login'
    ])
    .as('auth.login');

Router.get('/auth/logout', [
        global.csrf,
        'Auth@logout'
    ])
    .as('auth.logout');

Router.post('/auth/login', [
        global.csrf,
        validator.validate,
        'Auth@attempt'
    ])
    .as('auth.attempt');

Router.get('/auth/profile', [
        checkSession,
        global.csrf,
        'Auth@profile'
    ])
    .as('auth.profile');