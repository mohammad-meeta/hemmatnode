'use strict';
const validator = use('validators/department-category-register-validator');
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/department-category', [
        checkSession,
        Rule.canAsync('user.permision', 'departmentcategory.index'),
        'DepartmentCategory@index'
    ])
    .as('departmentcategory.index');


Router.get('/api/department-categories/:page/:size?', [
        checkSession,
        'DepartmentCategory@paginateDepartmentCategory'
    ])
    .as('api.departmentcategory');

Router.get('/department-category/create', [
        checkSession,
        Rule.canAsync('user.permision', 'departmentcategory.create'),
        'DepartmentCategory@create'
    ])
    .as('departmentcategory.create');

Router.get('/department-category/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'departmentcategory.edit'),
        'DepartmentCategory@edit'
    ])
    .as('departmentcategory.edit');

Router.post('/department-category', [
        checkSession,
        Rule.canAsync('user.permision', 'departmentcategory.store'),
        validator.validate,
        'DepartmentCategory@store'
    ])
    .as('departmentcategory.store');

Router.get('/department-category/:depCatData', [
        checkSession,
        Rule.canAsync('user.permision', 'departmentcategory.show'),
        'DepartmentCategory@show'
    ])
    .as('departmentcategory.show');

Router.get('/api/department-category/:depCatData/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'api.departmentcategory.edit'),
        'DepartmentCategory@editdepCatData'
    ])
    .as('api.departmentcategory.edit');

Router.patch('/department-category/:id', [
        checkSession,
        Rule.canAsync('user.permision', 'departmentcategory.update'),
        validator.validate,
        'DepartmentCategory@update'
    ])
    .as('departmentcategory.update');

Router.delete('/department-category/:depCatData', [
        checkSession,
        Rule.canAsync('user.permision', 'departmentcategory.destroy'),
        'DepartmentCategory@destroy'
    ])
    .as('departmentcategory.destroy');
