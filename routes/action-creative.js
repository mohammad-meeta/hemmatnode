'use strict';
const Rule = use('core/helpers/rule-helper');
// const validator = use('validators/actioncreative-register-validator');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/actioncreative/:department', [
    checkSession,
    Rule.canAsync('user.permision', 'actioncreative.index'),
    'Actioncreative@index'
])
    .as('actioncreative.index');

Router.get("/api/actioncreatives/:group/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.actioncreative"),
    "Actioncreative@paginateActioncreative"
]).as("api.actioncreative");


Router.get('/actioncreative/create', [
    checkSession,
    Rule.canAsync('user.permision', 'actioncreative.create'),
    'Actioncreative@create'
])
    .as('actioncreative.create');

Router.post('/actioncreative', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'actioncreative.store'),
    // validator.validate,
    'Actioncreative@store'
])
    .as('actioncreative.store');

Router.patch("/actioncreative/:id/edit", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "actioncreative.update"),
    // validator.validate,
    "Actioncreative@update"
]).as("actioncreative.update");

Router.get('/actioncreative/:actioncreative', [
    checkSession,
    Rule.canAsync('user.permision', 'actioncreative.show'),
    'Actioncreative@show'
])
    .as('actioncreative.show');

Router.delete('/actioncreative/:actioncreative', [
    checkSession,
    Rule.canAsync('user.permision', 'actioncreative.destroy'),
    'Actioncreative@destroy'
])
    .as('actioncreative.destroy');
