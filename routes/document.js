'use strict';
const validator = use('validators/document-register-validator');
const Rule = use('core/helpers/rule-helper');
var multer = require('multer');
const upload = multer({
    dest: 'uploads/'
});

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/document', [
        checkSession,
        Rule.canAsync('user.permision', 'document.index'),
        'Document@index'
    ])
    .as('document.index');

Router.get('/api/documents/:page/:size?', [
        checkSession,
        'Document@paginateDocument'
    ])
    .as('api.document');

Router.get('/document/create', [
        checkSession,
        Rule.canAsync('user.permision', 'document.create'),
        'Document@create'
    ])
    .as('document.create');

Router.get('/document/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'document.edit'),
        'Document@edit'
    ])
    .as('document.edit');

Router.post('/document', [
        upload.array('files'),
        checkSession,
        Rule.canAsync('user.permision', 'document.store'),
        validator.validate,
        'Document@store'
    ])
    .as('document.store');

Router.get('/document/:document', [
        checkSession,
        Rule.canAsync('user.permision', 'document.show'),
        'Document@show'
    ])
    .as('document.show');

Router.get('/api/document/:document/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'api.document.edit'),
        'Document@editDocumentData'
    ])
    .as('api.document.edit');

Router.patch('/document/:id', [
        checkSession,
        Rule.canAsync('user.permision', 'document.update'),
        validator.validate,
        'Document@update'
    ])
    .as('document.update');

Router.delete('/document/:document', [
        checkSession,
        Rule.canAsync('user.permision', 'document.destroy'),
        'Document@destroy'
    ])
    .as('document.destroy');