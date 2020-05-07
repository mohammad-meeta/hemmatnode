'use strict';
const validator = use('validators/session-register-validator');
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

Router.get('/session', [
        checkSession,
        Rule.canAsync('user.permision', 'session.index'),
        'Session@index'
    ])
    .as('session.index');

Router.get('/api/session/:page/:size?', [
        checkSession,
        'Session@paginateSession'
    ])
    .as('api.session');

Router.get('/session/create', [
        checkSession,
        Rule.canAsync('user.permision', 'session.create'),
        'Session@create'
    ])
    .as('session.create');

Router.get('/session/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'session.edit'),
        'Session@edit'
    ])
    .as('session.edit');

Router.post('/session', [
        upload.array('files'),
        checkSession,
        Rule.canAsync('user.permision', 'session.store'),
        validator.validate,
        'Session@store'
    ])
    .as('session.store');

Router.get('/session/:session', [
        checkSession,
        Rule.canAsync('user.permision', 'session.show'),
        'Session@show'
    ])
    .as('session.show');

Router.get('/api/session/:session/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'api.session.edit'),
        'Session@editSessionData'
    ])
    .as('api.session.edit');

Router.patch('/session/:id', [
        checkSession,
        Rule.canAsync('user.permision', 'session.update'),
        validator.validate,
        'Session@update'
    ])
    .as('session.update');

Router.delete('/session/:session', [
        checkSession,
        Rule.canAsync('user.permision', 'session.destroy'),
        'Session@destroy'
    ])
    .as('session.destroy');