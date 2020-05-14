'use strict';
const validator = use('validators/department-regulation-register-validator');
const Rule = use('core/helpers/rule-helper');
var multer = require('multer');
const upload = multer({
    dest: 'uploads/'
});

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/department/regulation', [
        checkSession,
        Rule.canAsync('user.permision', 'department.regulation.index'),
        'DepartmentRegulation@index'
    ])
    .as('department.regulation.index');

Router.get('/api/department/regulations/:page/:size?', [
        checkSession,
        'DepartmentRegulation@paginateDepartmentRegulation'
    ])
    .as('api.department.regulation');

Router.get('/department/regulation/create', [
        checkSession,
        Rule.canAsync('user.permision', 'department.regulation.create'),
        'DepartmentRegulation@create'
    ])
    .as('department.regulation.create');

Router.get('/department/regulation/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'department.regulation.edit'),
        'DepartmentRegulation@edit'
    ])
    .as('department.regulation.edit');

Router.post('/department/regulation', [
        upload.array('files'),
        checkSession,
        Rule.canAsync('user.permision', 'departmentregulation.store'),
        validator.validate,
        'DepartmentRegulation@store'
    ])
    .as('department.regulation.store');

Router.get('/department/regulation/:departmentregulation', [
        checkSession,
        Rule.canAsync('user.permision', 'department.regulation.show'),
        'DepartmentRegulation@show'
    ])
    .as('department.regulation.show');

Router.get('/api/department/regulation/:departmentregulation/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'api.department.regulation.edit'),
        'DepartmentRegulation@editDepartmentRegulationData'
    ])
    .as('api.department.regulation.edit');

Router.patch('/department/regulation/:id', [
        checkSession,
        Rule.canAsync('user.permision', 'department.regulation.update'),
        validator.validate,
        'DepartmentRegulation@update'
    ])
    .as('department.regulation.update');

Router.delete('/department/regulation/:departmentregulation', [
        checkSession,
        Rule.canAsync('user.permision', 'department.regulation.destroy'),
        'DepartmentRegulation@destroy'
    ])
    .as('department.regulation.destroy');