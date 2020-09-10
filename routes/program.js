'use strict';
const Rule = use('core/helpers/rule-helper');
const validator = use('validators/program-register-validator');
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

Router.get('/program/:department', [
    checkSession,
    Rule.canAsync('user.permision', 'program.index'),
    'Program@index'
])
    .as('program.index');

Router.get('/api/memorandum/:group/:page/:size?', [
    checkSession,
    Rule.canAsync('user.permision', 'api.program'),
    'Program@paginateProgram'
])
    .as('api.program');

Router.get('/program/create', [
    checkSession,
    Rule.canAsync('user.permision', 'program.create'),
    'Program@create'
])
    .as('program.create');

Router.post('/program', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'program.store'),
    validator.validate,
    'Program@store'
])
    .as('program.store');

Router.patch("/program/:id/edit", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "program.update"),
    // validator.validate,
    "Program@update"
]).as("program.update");

Router.get('/program/:program', [
    checkSession,
    Rule.canAsync('user.permision', 'program.show'),
    'Program@show'
])
    .as('program.show');

Router.delete('/program/:program', [
    checkSession,
    Rule.canAsync('user.permision', 'program.destroy'),
    'Program@destroy'
])
    .as('program.destroy');
