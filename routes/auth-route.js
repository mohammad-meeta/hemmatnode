'use strict';

const validator = use('validators/user-login-validator');
const authHelper = use('core/helpers/auth-helper');

Router.get('/auth/login', [
        global.csrf,
        'Auth@login'
    ])
    .as('auth.login');

Router.post('/auth/login', [
        global.csrf,
        validator.validate,
        'Auth@attempt'
    ])
    .as('auth.attempt');
