'use strict';
const Rule = use('core/helpers/rule-helper');
// const validator = use('validators/monitoringtype-register-validator');
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

Router.get('/monitoringtype', [
    checkSession,
    Rule.canAsync('user.permision', 'monitoringtype.index'),
    'Monitoringtype@index'
])
    .as('monitoringtype.index');

Router.get("/api/monitoringtypes/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.monitoringtype"),
    "Monitoringtype@paginateMonitoringtype"
]).as("api.monitoringtype");

Router.get('/monitoringtype/create', [
    checkSession,
    Rule.canAsync('user.permision', 'monitoringtype.create'),
    'Monitoringtype@create'
])
    .as('monitoringtype.create');

Router.post('/monitoringtype', [
    checkSession,
    Rule.canAsync('user.permision', 'monitoringtype.store'),
    upload.any(),
    // validator.validate,
    'Monitoringtype@store'
])
    .as('monitoringtype.store');

Router.patch("/monitoringtype/:id/edit", [
    checkSession,
    Rule.canAsync("user.permision", "monitoringtype.update"),
    upload.any(),
    // validator.validate,
    "Monitoringtype@update"
]).as("monitoringtype.update");

Router.get('/monitoringtype/:monitoringtype', [
    checkSession,
    Rule.canAsync('user.permision', 'monitoringtype.show'),
    'Monitoringtype@show'
])
    .as('monitoringtype.show');

Router.delete('/monitoringtype/:monitoringtype', [
    checkSession,
    Rule.canAsync('user.permision', 'monitoringtype.destroy'),
    'Monitoringtype@destroy'
])
    .as('monitoringtype.destroy');
