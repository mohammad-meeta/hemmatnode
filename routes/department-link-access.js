'use strict';
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/api/department-link-access/:departmentId', [
        checkSession,
        // Rule.canAsync('user.permision', 'api.program'),
        'DepartmentLinkAccess@loadDepartmentLinkAccess'
    ])
    .as('api.department.link.access');