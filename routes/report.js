'use strict';
const Rule = use('core/helpers/rule-helper');
// const validator = use('validators/report-register-validator');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/report/:department', [
    checkSession,
    Rule.canAsync('user.permision', 'report.index'),
    'Report@index'
])
    .as('report.index');

Router.get("/api/reports/:group/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.report"),
    "Report@paginateReport"
]).as("api.report");

Router.get("/api/find/report/:year/:index/:group", [
    checkSession,
    Rule.canAsync("user.permision", "api.report"),
    "Report@findReport"
]).as("api.find.report");

Router.get("/api/reports/:group/:year/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.report.year"),
    "Report@paginateReportYear"
]).as("api.report.year");

Router.get('/report/create', [
    checkSession,
    Rule.canAsync('user.permision', 'report.create'),
    'Report@create'
])
    .as('report.create');

Router.post('/report', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'report.store'),
    // validator.validate,
    'Report@store'
])
    .as('report.store');

Router.patch("/report/:id/edit", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "report.update"),
    // validator.validate,
    "Report@update"
]).as("report.update");

Router.get('/report/:report', [
    checkSession,
    Rule.canAsync('user.permision', 'report.show'),
    'Report@show'
])
    .as('report.show');

Router.get('/report/group/date/:group', [
    // checkSession,
    Rule.canAsync('user.permision', 'report.group.date'),
    'Report@groupDate'
])
    .as('report.group.date');

Router.delete('/report/:report', [
    checkSession,
    Rule.canAsync('user.permision', 'report.destroy'),
    'Report@destroy'
])
    .as('report.destroy');
