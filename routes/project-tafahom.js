'use strict';
const Rule = use('core/helpers/rule-helper');
// const validator = use('validators/projecttafahom-register-validator');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/projecttafahom/:department', [
    checkSession,
    Rule.canAsync('user.permision', 'projecttafahom.index'),
    'ProjectTafahom@index'
])
    .as('projecttafahom.index');

Router.get("/api/projecttafahoms/:group/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.projecttafahom"),
    "ProjectTafahom@paginateProjectTafahom"
]).as("api.projecttafahom");

// Router.get("/api/projecttafahoms/:group/:year/:page/:size?", [
//     checkSession,
//     Rule.canAsync("user.permision", "api.projecttafahom.year"),
//     "ProjectTafahom@paginateProjectTafahomYear"
// ]).as("api.projecttafahom.year");

Router.get('/projecttafahom/create', [
    checkSession,
    Rule.canAsync('user.permision', 'projecttafahom.create'),
    'ProjectTafahom@create'
])
    .as('projecttafahom.create');

Router.post('/projecttafahom', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'projecttafahom.store'),
    // validator.validate,
    'ProjectTafahom@store'
])
    .as('projecttafahom.store');

Router.patch("/projecttafahom/:id/edit", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "projecttafahom.update"),
    // validator.validate,
    "ProjectTafahom@update"
]).as("projecttafahom.update");

Router.get('/projecttafahom/:projecttafahom', [
    checkSession,
    Rule.canAsync('user.permision', 'projecttafahom.show'),
    'ProjectTafahom@show'
])
    .as('projecttafahom.show');

// Router.get('/projecttafahom/group/date/:group', [
//     // checkSession,
//     Rule.canAsync('user.permision', 'projecttafahom.group.date'),
//     'ProjectTafahom@groupDate'
// ])
//     .as('projecttafahom.group.date');

Router.delete('/projecttafahom/:projecttafahom', [
    checkSession,
    Rule.canAsync('user.permision', 'projecttafahom.destroy'),
    'ProjectTafahom@destroy'
])
    .as('projecttafahom.destroy');
