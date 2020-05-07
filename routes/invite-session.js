'use strict';
const validator = use('validators/invite-session-register-validator');
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

Router.get('/invite-session', [
        checkSession,
        Rule.canAsync('user.permision', 'invitesession.index'),
        'InviteSession@index'
    ])
    .as('invitesession.index');

Router.get('/api/invite-session/:page/:size?', [
        checkSession,
        'InviteSession@paginateInviteSession'
    ])
    .as('api.invitesession');

Router.get('/invite-session/create', [
        checkSession,
        Rule.canAsync('user.permision', 'invitesession.create'),
        'InviteSession@create'
    ])
    .as('invitesession.create');

Router.get('/invite-session/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'invitesession.edit'),
        'InviteSession@edit'
    ])
    .as('invitesession.edit');

Router.post('/invite-session', [
        upload.array('files'),
        checkSession,
        Rule.canAsync('user.permision', 'invitesession.store'),
        validator.validate,
        'InviteSession@store'
    ])
    .as('invitesession.store');

Router.get('/invite-session/:invitesession', [
        checkSession,
        Rule.canAsync('user.permision', 'invitesession.show'),
        'InviteSession@show'
    ])
    .as('invitesession.show');

Router.get('/api/invite-session/:invitesession/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'api.invitesession.edit'),
        'InviteSession@editInviteSessionData'
    ])
    .as('api.invitesession.edit');

Router.patch('/invite-session/:id', [
        checkSession,
        Rule.canAsync('user.permision', 'invitesession.update'),
        validator.validate,
        'InviteSession@update'
    ])
    .as('invitesession.update');

Router.delete('/invite-session/:invitesession', [
        checkSession,
        Rule.canAsync('user.permision', 'invitesession.destroy'),
        'InviteSession@destroy'
    ])
    .as('invitesession.destroy');