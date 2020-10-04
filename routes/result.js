'use strict';
const validator = use('validators/result-register-validator');
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/result', [
    checkSession,
    // Rule.canAsync('user.permision', 'result.index'),
    'Result@index'
])
    .as('result.index');

Router.get('/api/results/:page/:size?', [
    checkSession,
    'Result@paginateResult'
])
    .as('api.result');

Router.get('/result/create', [
    checkSession,
    // Rule.canAsync('user.permision', 'result.create'),
    'Result@create'
])
    .as('result.create');

Router.get('/result/edit', [
    checkSession,
    // Rule.canAsync('user.permision', 'result.edit'),
    'Result@edit'
])
    .as('result.edit');

Router.post('/result', [
    upload.array('files'),
    checkSession,
    // Rule.canAsync('user.permision', 'result.store'),
    validator.validate,
    'Result@store'
])
    .as('result.store');

Router.get('/result/:result', [
    checkSession,
    // Rule.canAsync('user.permision', 'result.show'),
    'Result@show'
])
    .as('result.show');

Router.get('/api/result/:result/edit', [
    checkSession,
    // Rule.canAsync('user.permision', 'api.result.edit'),
    'Result@editResultData'
])
    .as('api.result.edit');

Router.patch('/result/:id', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'result.update'),
    // validator.validate,
    'Result@update'
])
    .as('result.update');

Router.delete('/result/:result', [
    checkSession,
    // Rule.canAsync('user.permision', 'result.destroy'),
    'Result@destroy'
])
    .as('result.destroy');