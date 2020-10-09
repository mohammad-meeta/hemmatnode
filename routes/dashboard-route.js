'use strict';

const {
    checkSession
} = use('app/helpers/auth-helper');

Router.get('/dashboard', [
    checkSession,
    'Dashboard@index'
])
    .as('dashboard.index');