'use strict';
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/api/sections/:page/:size?', [
        // checkSession,
        // Rule.canAsync('user.permision', 'api.program'),
        'Section@paginateSectionData'
    ])
    .as('api.section');
