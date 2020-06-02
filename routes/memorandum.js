'use strict';
const validator = use('validators/memorandum-register-validator');
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

Router.get('/memorandum/:department?', [
        checkSession,
        Rule.canAsync('user.permision', 'memorandum.index'),
        'Memorandum@index'
    ])
    .as('memorandum.index');

Router.get('/api/memorandum/:group/:page/:size?/', [
        checkSession,
        'Memorandum@paginateMemorandum'
    ])
    .as('api.memorandum');

Router.get('/memorandum/create', [
        checkSession,
        Rule.canAsync('user.permision', 'memorandum.create'),
        'Memorandum@create'
    ])
    .as('memorandum.create');

Router.get('/memorandum/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'memorandum.edit'),
        'Memorandum@edit'
    ])
    .as('memorandum.edit');

Router.post('/memorandum/:department?', [
        upload.array('files'),
        checkSession,
        Rule.canAsync('user.permision', 'memorandum.store'),
        validator.validate,
        'Memorandum@store'
    ])
    .as('memorandum.store');

Router.get('/memorandum/:memorandum', [
        checkSession,
        Rule.canAsync('user.permision', 'memorandum.show'),
        'Memorandum@show'
    ])
    .as('memorandum.show');

Router.get('/api/memorandum/:memorandum/edit', [
        checkSession,
        Rule.canAsync('user.permision', 'api.memorandum.edit'),
        'Memorandum@editMemorandumData'
    ])
    .as('api.memorandum.edit');

Router.patch('/memorandum/:id', [
        checkSession,
        Rule.canAsync('user.permision', 'memorandum.update'),
        validator.validate,
        'Memorandum@update'
    ])
    .as('memorandum.update');

Router.delete('/memorandum/:memorandum', [
        checkSession,
        Rule.canAsync('user.permision', 'memorandum.destroy'),
        'Memorandum@destroy'
    ])
    .as('memorandum.destroy');
