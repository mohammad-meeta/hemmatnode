'use strict';
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/zonecat', [
    checkSession,
    Rule.canAsync('user.permision', 'zonecat.index'),
    'Zonecat@index'
])
    .as('zonecat.index');

Router.get('/zonecat/references/:references', [
    checkSession,
    Rule.canAsync('user.permision', 'zonecat.references'),
    'Zonecat@References'
])
    .as('zonecat.references');

Router.get('/api/zonecats/:page/:size?', [
    checkSession,
    'Zonecat@paginateZonecat'
])
    .as('api.zonecat');

Router.get('/api/zonecats/refrencess/null/:page/:size?', [
    checkSession,
    'Zonecat@paginateZonecatReferencessNull'
])
    .as('api.zonecat.refrencess.null');

Router.get('/api/all/zonecats/document/:page/:size?', [
    checkSession,
    'Zonecat@paginateAllZonecatDocument'
])
    .as('api.all.zonecat.document');

Router.get('/zonecat/create', [
    checkSession,
    Rule.canAsync('user.permision', 'zonecat.create'),
    'Zonecat@create'
])
    .as('zonecat.create');

Router.get('/zonecat/edit', [
    checkSession,
    Rule.canAsync('user.permision', 'zonecat.edit'),
    'Zonecat@edit'
])
    .as('zonecat.edit');

Router.post('/zonecat', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'zonecat.store'),
    'Zonecat@store'
])
    .as('zonecat.store');

Router.get('/zonecat/:zonecat', [
    checkSession,
    Rule.canAsync('user.permision', 'zonecat.show'),
    'Zonecat@show'
])
    .as('zonecat.show');

Router.get('/api/zonecat/user/:group', [
    checkSession,
    Rule.canAsync('user.permision', 'zonecat.show'),
    'Zonecat@userData'
])
    .as('api.zonecat.user');

Router.get('/api/zonecat/:zonecat', [
    checkSession,
    // Rule.canAsync('user.permision', 'api.zonecat.show'),
    'Zonecat@loadData'
])
    .as('api.zonecat.show');

Router.get('/api/zonecat/:zonecat/edit', [
    checkSession,
    Rule.canAsync('user.permision', 'api.zonecat.edit'),
    'Zonecat@editZonecatData'
])
    .as('api.zonecat.edit');

Router.patch('/zonecat/:id', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'zonecat.update'),
    'Zonecat@update'
])
    .as('zonecat.update');

Router.delete('/zonecat/:zonecat', [
    checkSession,
    Rule.canAsync('user.permision', 'zonecat.destroy'),
    'Zonecat@destroy'
])
    .as('zonecat.destroy');