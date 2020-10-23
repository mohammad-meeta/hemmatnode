'use strict';
const validator = use('validators/department-register-validator');
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/department', [
    checkSession,
    Rule.canAsync('user.permision', 'department.index'),
    'Department@index'
])
    .as('department.index');

Router.get('/department/references/:references', [
    checkSession,
    Rule.canAsync('user.permision', 'department.references'),
    'Department@References'
])
    .as('department.references');

Router.get('/api/departments/:page/:size?', [
    checkSession,
    'Department@paginateDepartment'
])
    .as('api.department');

Router.get('/api/departments/refrencess/null/:page/:size?', [
    checkSession,
    'Department@paginateDepartmentReferencessNull'
])
    .as('api.department.refrencess.null');

Router.get('/api/all/departments/document/:page/:size?', [
    checkSession,
    'Department@paginateAllDepartmentDocument'
])
    .as('api.all.department.document');

Router.get('/department/create', [
    checkSession,
    Rule.canAsync('user.permision', 'department.create'),
    'Department@create'
])
    .as('department.create');

Router.get('/department/edit', [
    checkSession,
    Rule.canAsync('user.permision', 'department.edit'),
    'Department@edit'
])
    .as('department.edit');

Router.post('/department', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'department.store'),
    validator.validate,
    'Department@store'
])
    .as('department.store');

Router.get('/department/:department', [
    checkSession,
    Rule.canAsync('user.permision', 'department.show'),
    'Department@show'
])
    .as('department.show');

Router.get('/api/department/:department', [
    checkSession,
    Rule.canAsync('user.permision', 'api.department.show'),
    'Department@loadData'
])
    .as('api.department.show');

Router.get('/api/department/:department/edit', [
    checkSession,
    Rule.canAsync('user.permision', 'api.department.edit'),
    'Department@editDepartmentData'
])
    .as('api.department.edit');

Router.patch('/department/:id', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'department.update'),
    validator.validate,
    'Department@update'
])
    .as('department.update');

Router.delete('/department/:department', [
    checkSession,
    Rule.canAsync('user.permision', 'department.destroy'),
    'Department@destroy'
])
    .as('department.destroy');