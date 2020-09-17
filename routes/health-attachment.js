'use strict';
const Rule = use('core/helpers/rule-helper');
// const validator = use('validators/health-register-validator');
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

Router.get('/health/:department/:year', [
    checkSession,
    Rule.canAsync('user.permision', 'health.index'),
    'Health@index'
])
    .as('health.index');

Router.get("/api/healths/:group/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.health"),
    "Health@paginateHealth"
]).as("api.health");

Router.get("/api/healths/:group/:year/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.health.year"),
    "Health@paginateHealthYear"
]).as("api.health.year");

Router.get('/health/create', [
    checkSession,
    Rule.canAsync('user.permision', 'health.create'),
    'Health@create'
])
    .as('health.create');

Router.post('/health', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'health.store'),
    // validator.validate,
    'Health@store'
])
    .as('health.store');

Router.patch("/health/:id/edit", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "health.update"),
    // validator.validate,
    "Health@update"
]).as("health.update");

Router.get('/health/:health', [
    checkSession,
    Rule.canAsync('user.permision', 'health.show'),
    'Health@show'
])
    .as('health.show');

Router.get('/health/group/date/:group', [
    // checkSession,
    Rule.canAsync('user.permision', 'health.group.date'),
    'Health@groupDate'
])
    .as('health.group.date');

Router.delete('/health/:health', [
    checkSession,
    Rule.canAsync('user.permision', 'health.destroy'),
    'Health@destroy'
])
    .as('health.destroy');
