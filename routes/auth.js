'use strict';

const validator = use('validators/user-login-validator');
const authHelper = use('core/helpers/auth-helper');

Router.get('/auth/login', 'Auth@login')
    .as('auth.login');

Router.post('/auth/login', [
        validator.validate,
        'Auth@attempt'
    ])
    .as('auth.attempt');

Router.get('/auth/register', 'Auth@register')
    .as('auth.register');

Router.post('/auth/register', 'Auth@registerUser')
    .as('auth.register-user');
