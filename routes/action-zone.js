'use strict';
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/actionzone', [
    checkSession,
    Rule.canAsync('user.permision', 'actionzone.index'),
    'ActionZone@index'
])
    .as('actionzone.index');

Router.get('/actionzone/references/:references', [
    checkSession,
    Rule.canAsync('user.permision', 'actionzone.references'),
    'ActionZone@References'
])
    .as('actionzone.references');

Router.get('/api/actionzones/:page/:size?', [
    // checkSession,
    'ActionZone@paginateActionZone'
])
    .as('api.actionzone');

Router.get('/api/actionzones/refrencess/null/:page/:size?', [
    checkSession,
    'ActionZone@paginateActionZoneReferencessNull'
])
    .as('api.actionzone.refrencess.null');

Router.get('/actionzone/create', [
    checkSession,
    Rule.canAsync('user.permision', 'actionzone.create'),
    'ActionZone@create'
])
    .as('actionzone.create');

Router.get('/actionzone/edit', [
    checkSession,
    Rule.canAsync('user.permision', 'actionzone.edit'),
    'ActionZone@edit'
])
    .as('actionzone.edit');

Router.post('/actionzone', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'actionzone.store'),
    'ActionZone@store'
])
    .as('actionzone.store');

Router.get('/actionzone/:actionzone', [
    checkSession,
    Rule.canAsync('user.permision', 'actionzone.show'),
    'ActionZone@show'
])
    .as('actionzone.show');

Router.get('/api/actionzone/:actionzone', [
    checkSession,
    Rule.canAsync('user.permision', 'api.actionzone.show'),
    'ActionZone@loadData'
])
    .as('api.actionzone.show');

Router.get('/api/actionzone/:actionzone/edit', [
    checkSession,
    Rule.canAsync('user.permision', 'api.actionzone.edit'),
    'ActionZone@editActionZoneData'
])
    .as('api.actionzone.edit');

Router.patch('/actionzone/:id', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'actionzone.update'),
    'ActionZone@update'
])
    .as('actionzone.update');

Router.delete('/actionzone/:actionzone', [
    checkSession,
    Rule.canAsync('user.permision', 'actionzone.destroy'),
    'ActionZone@destroy'
])
    .as('actionzone.destroy');