'use strict';
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/api/programs/:page/:size?', [
        checkSession,
        // Rule.canAsync('user.permision', 'api.program'),
        'Program@paginateProgramData'
    ])
    .as('api.program');
