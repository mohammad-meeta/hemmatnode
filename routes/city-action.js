'use strict';
const Rule = use('core/helpers/rule-helper');
// const validator = use('validators/cityaction-register-validator');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/cityaction/:department', [
    checkSession,
    Rule.canAsync('user.permision', 'cityaction.index'),
    'Cityaction@index'
])
    .as('cityaction.index');

Router.get("/api/cityactions/:group/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.cityaction"),
    "Cityaction@paginateCityaction"
]).as("api.cityaction");


Router.get('/cityaction/create', [
    checkSession,
    Rule.canAsync('user.permision', 'cityaction.create'),
    'Cityaction@create'
])
    .as('cityaction.create');

Router.post('/cityaction', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'cityaction.store'),
    // validator.validate,
    'Cityaction@store'
])
    .as('cityaction.store');

Router.patch("/cityaction/:id/edit", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "cityaction.update"),
    // validator.validate,
    "Cityaction@update"
]).as("cityaction.update");

Router.get('/cityaction/:cityaction', [
    checkSession,
    Rule.canAsync('user.permision', 'cityaction.show'),
    'Cityaction@show'
])
    .as('cityaction.show');

Router.delete('/cityaction/:cityaction', [
    checkSession,
    Rule.canAsync('user.permision', 'cityaction.destroy'),
    'Cityaction@destroy'
])
    .as('cityaction.destroy');
