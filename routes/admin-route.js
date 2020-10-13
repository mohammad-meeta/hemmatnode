'use strict';
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

Router.get('/admin/role/rule/create/permission', [
    Rule.canAsync('user.permision', 'admin.create.permission'),
    checkSession,
    'Admin@createPermission'
])
    .as('admin.create.permission');
