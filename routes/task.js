'use strict';
const validator = use('validators/task-register-validator');
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

Router.get('/task', [
        checkSession,
        //Rule.canAsync('user.permision', 'task.index'),
        'Task@index'
    ])
    .as('task.index');

Router.get('/api/tasks/:page/:size?', [
        checkSession,
        'Task@paginateTask'
    ])
    .as('api.task');

Router.get('/task/create', [
        checkSession,
        //Rule.canAsync('user.permision', 'task.create'),
        'Task@create'
    ])
    .as('task.create');

Router.get('/task/edit', [
        checkSession,
        //Rule.canAsync('user.permision', 'task.edit'),
        'Task@edit'
    ])
    .as('task.edit');

Router.post('/task', [
        upload.array('files'),
        checkSession,
        //Rule.canAsync('user.permision', 'task.store'),
        validator.validate,
        'Task@store'
    ])
    .as('task.store');

Router.get('/task/:task', [
        checkSession,
        //Rule.canAsync('user.permision', 'task.show'),
        'Task@show'
    ])
    .as('task.show');

Router.get('/api/task/:task/edit', [
        checkSession,
        //Rule.canAsync('user.permision', 'api.task.edit'),
        'Task@editTaskData'
    ])
    .as('api.task.edit');

Router.patch('/task/:id', [
        checkSession,
        //Rule.canAsync('user.permision', 'task.update'),
        validator.validate,
        'Task@update'
    ])
    .as('task.update');

Router.delete('/task/:task', [
        checkSession,
        //Rule.canAsync('user.permision', 'task.destroy'),
        'Task@destroy'
    ])
    .as('task.destroy');
