'use strict';
const Rule = use('core/helpers/rule-helper');
const validator = use('validators/document-register-validator');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/document/:department/:year?', [
    checkSession,
    Rule.canAsync('user.permision', 'document.index'),
    'Document@index'
])
    .as('document.index');

Router.get("/api/documents/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.document"),
    "Document@paginateDocumentAll"
]).as("api.document.all");

Router.get("/api/documents/:group/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.document"),
    "Document@paginateDocument"
]).as("api.document");

Router.get('/document/create', [
    checkSession,
    Rule.canAsync('user.permision', 'document.create'),
    'Document@create'
])
    .as('document.create');

Router.post('/document', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'document.store'),
    // validator.validate,
    'Document@store'
])
    .as('document.store');

Router.patch("/document/:id/edit", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "document.update"),
    // validator.validate,
    "Document@update"
]).as("document.update");

Router.get('/document/:document', [
    checkSession,
    Rule.canAsync('user.permision', 'document.show'),
    'Document@show'
])
    .as('document.show');

Router.delete('/document/:document', [
    checkSession,
    Rule.canAsync('user.permision', 'document.destroy'),
    'Document@destroy'
])
    .as('document.destroy');
