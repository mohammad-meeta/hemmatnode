"use strict";

const Rule = use('core/helpers/rule-helper');
// const validator = use('validators/health-register-validator');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/upload_token', [
    checkSession,
    'storage@uploadToken'
])
    .as('storage.upload_token');

Router.get('/get_image/:name', [
    checkSession,
    'storage@getImage'
])
    .as('storage.get_image');

Router.post('/upload_image', [
    Rule.canAsync('user.permision', 'health.store'),
    upload.array('files'),
    checkSession,
    'storage@uploadImage'
])
    .as('storage.upload_image');

