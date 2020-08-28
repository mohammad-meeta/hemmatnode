'use strict';
// const validator = use('validators/response-register-validator');
const Rule = use('core/helpers/rule-helper');
const multer = require('multer');
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

Router.get('/response', [
    checkSession,
    Rule.canAsync('user.permision', 'response.index'),
    'Response@index'
])
    .as('response.index');

Router.get('/api/response/:page/:size?', [
    checkSession,
    'Response@paginateResponse'
])
    .as('api.response');

Router.get('/api/all-request/:page/:size?', [
    checkSession,
    'Response@paginateRequest'
])
    .as('api.all-request');

Router.get('/api/response/:reqId/:page/:size?', [
    checkSession,
    'Response@paginateResponseRequest'
])
    .as('api.response.requset');

Router.get('/response/create', [
    checkSession,
    Rule.canAsync('user.permision', 'response.create'),
    'Response@create'
])
    .as('response.create');

Router.get('/response/edit', [
    checkSession,
    Rule.canAsync('user.permision', 'response.edit'),
    'Response@edit'
])
    .as('response.edit');

Router.post('/response', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'response.store'),
    // validator.validate,
    'Response@store'
])
    .as('response.store');

Router.get('/response/:response', [
    checkSession,
    Rule.canAsync('user.permision', 'response.show'),
    'Response@show'
])
    .as('response.show');

Router.get('/api/response/:response/edit', [
    checkSession,
    Rule.canAsync('user.permision', 'api.response.edit'),
    'Response@editResponseData'
])
    .as('api.response.edit');

Router.patch('/response/:id', [
    checkSession,
    Rule.canAsync('user.permision', 'response.update'),
    // validator.validate,
    'Response@update'
])
    .as('response.update');

Router.delete('/response/:response', [
    checkSession,
    Rule.canAsync('user.permision', 'response.destroy'),
    'Response@destroy'
])
    .as('response.destroy');