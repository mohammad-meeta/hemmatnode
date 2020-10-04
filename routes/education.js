'use strict';
const Rule = use('core/helpers/rule-helper');
// const validator = use('validators/education-register-validator');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/education/:department', [
    checkSession,
    Rule.canAsync('user.permision', 'education.index'),
    'Education@index'
])
    .as('education.index');

Router.get("/api/educations/:group/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.education"),
    "Education@paginateEducation"
]).as("api.education");


Router.get('/education/create', [
    checkSession,
    Rule.canAsync('user.permision', 'education.create'),
    'Education@create'
])
    .as('education.create');

Router.post('/education', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'education.store'),
    // validator.validate,
    'Education@store'
])
    .as('education.store');

Router.patch("/education/:id/edit", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "education.update"),
    // validator.validate,
    "Education@update"
]).as("education.update");

Router.get('/education/:education', [
    checkSession,
    Rule.canAsync('user.permision', 'education.show'),
    'Education@show'
])
    .as('education.show');

Router.delete('/education/:education', [
    checkSession,
    Rule.canAsync('user.permision', 'education.destroy'),
    'Education@destroy'
])
    .as('education.destroy');
