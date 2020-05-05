'use strict';
const validator = use('validators/document-type-register-validator');
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

Router.get('/document-type', [
        checkSession,
        Rule.canAsync('user.permision', 'documenttype.index'),
        'DocumentType@index'
    ])
    .as('documenttype.index');

Router.get('/api/document-types/:page/:size?', [
        checkSession,
        'DocumentType@paginateDocumentType'
    ])
    .as('api.department');

Router.get('/document-type/create', [
        checkSession,
        Rule.canAsync('user.permision', 'documenttype.create'),
        'DocumentType@create'
    ])
    .as('documenttype.create');

Router.get('/document-type/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'documenttype.edit'),
        'DocumentType@edit'
    ])
    .as('documenttype.edit');

Router.post('/document-type', [
        checkSession,
        Rule.canAsync('user.permision', 'documenttype.store'),
        validator.validate,
        'DocumentType@store'
    ])
    .as('documenttype.store');

Router.get('/document-type/:document', [
        checkSession,
        Rule.canAsync('user.permision', 'documenttype.show'),
        'DocumentType@show'
    ])
    .as('documenttype.show');

Router.get('/api/document-type/:document/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'api.documenttype.edit'),
        'DocumentType@editDocumentTypeData'
    ])
    .as('api.documenttype.edit');

Router.patch('/document-type/:id', [
        checkSession,
        Rule.canAsync('user.permision', 'documenttype.update'),
        validator.validate,
        'DocumentType@update'
    ])
    .as('documenttype.update');

Router.delete('/document-type/:document', [
        checkSession,
        Rule.canAsync('user.permision', 'documenttype.destroy'),
        'DocumentType@destroy'
    ])
    .as('documenttype.destroy');