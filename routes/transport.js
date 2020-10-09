'use strict';
const Rule = use('core/helpers/rule-helper');
// const validator = use('validators/transport-register-validator');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/transport/:department', [
    checkSession,
    Rule.canAsync('user.permision', 'transport.index'),
    'Transport@index'
])
    .as('transport.index');

Router.get("/api/transports/:group/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.transport"),
    "Transport@paginateTransport"
]).as("api.transport");

Router.get('/transport/create', [
    checkSession,
    Rule.canAsync('user.permision', 'transport.create'),
    'Transport@create'
])
    .as('transport.create');

Router.post('/transport', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'transport.store'),
    // validator.validate,
    'Transport@store'
])
    .as('transport.store');

Router.patch("/transport/:id/edit", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "transport.update"),
    // validator.validate,
    "Transport@update"
]).as("transport.update");

Router.get('/transport/:transport', [
    checkSession,
    Rule.canAsync('user.permision', 'transport.show'),
    'Transport@show'
])
    .as('transport.show');

Router.get('/transport/group/date/:group', [
    // checkSession,
    Rule.canAsync('user.permision', 'transport.group.date'),
    'Transport@groupDate'
])
    .as('transport.group.date');

Router.delete('/transport/:transport', [
    checkSession,
    Rule.canAsync('user.permision', 'transport.destroy'),
    'Transport@destroy'
])
    .as('transport.destroy');
