'use strict';
const Rule = use('core/helpers/rule-helper');
const validator = use('validators/department-regulation-register-validator');
const multer = require("multer");
const upload = multer({
    dest: "uploads/"
});

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/regulation/:department', [
    checkSession,
    Rule.canAsync('user.permision', 'department.regulation.index'),
    'DepartmentRegulation@index'
])
    .as('department.regulation.index');

Router.get("/api/regulations/:group/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.department.regulation"),
    "DepartmentRegulation@paginateRegulation"
]).as("api.department.regulation");

Router.get('/regulation/create', [
    checkSession,
    Rule.canAsync('user.permision', 'department.regulation.create'),
    'DepartmentRegulation@create'
])
    .as('department.regulation.create');

Router.post('/regulation', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'departmentregulation.store'),
    // validator.validate,
    'DepartmentRegulation@store'
])
    .as('departmentregulation.store');

Router.patch("/regulation/:id/edit", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "department.regulation.update"),
    // validator.validate,
    "DepartmentRegulation@update"
]).as("department.regulation.update");

Router.delete('/regulation/:regulation', [
    checkSession,
    Rule.canAsync('user.permision', 'department.regulation.destroy'),
    'DepartmentRegulation@destroy'
])
    .as('department.regulation.destroy');
