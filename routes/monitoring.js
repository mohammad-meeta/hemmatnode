'use strict';
const Rule = use('core/helpers/rule-helper');
// const validator = use('validators/monitoring-register-validator');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/monitoring', [
    checkSession,
    Rule.canAsync('user.permision', 'monitoring.index'),
    'Monitoring@index'
])
    .as('monitoring.index');

// Router.get("/api/monitorings/:page/:size?", [
//     checkSession,
//     Rule.canAsync("user.permision", "api.monitoring"),
//     "Monitoring@paginateMonitoringAll"
// ]).as("api.monitoring.all");

Router.get("/api/monitorings/:index/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.monitoring"),
    "Monitoring@paginateMonitoring"
]).as("api.monitoring");

Router.get("/api/all/monitorings/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.monitoring"),
    "Monitoring@paginateMonitoringAll"
]).as("api.all.monitoring");

Router.get('/monitoring/create', [
    checkSession,
    Rule.canAsync('user.permision', 'monitoring.create'),
    'Monitoring@create'
])
    .as('monitoring.create');

Router.post('/monitoring', [
    checkSession,
    Rule.canAsync('user.permision', 'monitoring.store'),
    upload.any('files'),
    // validator.validate,
    'Monitoring@store'
])
    .as('monitoring.store');

Router.patch("/monitoring/:id/edit", [
    checkSession,
    Rule.canAsync("user.permision", "monitoring.update"),
    upload.any('files'),
    // validator.validate,
    "Monitoring@update"
]).as("monitoring.update");

Router.get('/monitoring/:monitoring', [
    checkSession,
    Rule.canAsync('user.permision', 'monitoring.show'),
    'Monitoring@show'
])
    .as('monitoring.show');

Router.delete('/monitoring/:monitoring', [
    checkSession,
    Rule.canAsync('user.permision', 'monitoring.destroy'),
    'Monitoring@destroy'
])
    .as('monitoring.destroy');
