'use strict';
// const validator = use('validators/request-register-validator');
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

Router.get('/request', [
        checkSession,
        Rule.canAsync('user.permision', 'request.index'),
        'Request@index'
    ])
    .as('request.index');

Router.get('/api/requests/:page/:size?', [
        checkSession,
        'Request@paginateRequest'
    ])
    .as('api.request');

Router.get('/request/create', [
        checkSession,
        Rule.canAsync('user.permision', 'request.create'),
        'Request@create'
    ])
    .as('request.create');

Router.get('/request/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'request.edit'),
        'Request@edit'
    ])
    .as('request.edit');

Router.post('/request', [
        upload.array('files'),
        checkSession,
        Rule.canAsync('user.permision', 'request.store'),
        // validator.validate,
        'Request@store'
    ])
    .as('request.store');

Router.get('/request/:request', [
        checkSession,
        Rule.canAsync('user.permision', 'request.show'),
        'Request@show'
    ])
    .as('request.show');

Router.get('/api/request/:request/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'api.request.edit'),
        'Request@editRequestData'
    ])
    .as('api.request.edit');

Router.patch('/request/:id', [
        checkSession,
        Rule.canAsync('user.permision', 'request.update'),
        // validator.validate,
        'Request@update'
    ])
    .as('request.update');

Router.delete('/request/:request', [
        checkSession,
        Rule.canAsync('user.permision', 'request.destroy'),
        'Request@destroy'
    ])
    .as('request.destroy');
