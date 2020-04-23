'use strict';

const Rule = use('core/helpers/rule-helper');
const {
    checkSession
} = use('app/helpers/auth-helper');

Router.get('/roles', [
        checkSession,
        Rule.canAsync('user.permision', 'role.index'),
        'Role@index'
    ])
    .as('role.index');