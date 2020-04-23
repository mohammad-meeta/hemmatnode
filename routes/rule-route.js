'use strict';

const Rule = use('core/helpers/rule-helper');
const {
    checkSession
} = use('app/helpers/auth-helper');

Router.get('/rules', [
        checkSession,
        Rule.canAsync('user.permision', 'rule.index'),
        'Rule@index'
    ])
    .as('rule.index');