'use strict';

const authHelper = use('core/helpers/auth-helper');

Router.post('/dep-cat', [
        authHelper.checkAuth,
        'DepartmentCategory@register'
    ])
    .as('dep-cate.reigster');

Router.delete('/dep-cat/:id', [
        authHelper.checkAuth,
        'DepartmentCategory@destroy'
    ])
    .as('dep-cate.destroy');
