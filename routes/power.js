'use strict';
const Rule = use('core/helpers/rule-helper');
// const validator = use('validators/power-register-validator');
const multer = require("multer");
const upload = multer({
    dest: "uploads/"
});

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/power', [
    checkSession,
    Rule.canAsync('user.permision', 'power.index'),
    'Power@index'
])
    .as('power.index');

// Router.get("/api/powers/:page/:size?", [
//     checkSession,
//     Rule.canAsync("user.permision", "api.power"),
//     "Power@paginatePowerAll"
// ]).as("api.power.all");

Router.get("/api/powers/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.power"),
    "Power@paginatePower"
]).as("api.power");

Router.get('/power/create', [
    checkSession,
    Rule.canAsync('user.permision', 'power.create'),
    'Power@create'
])
    .as('power.create');

Router.post('/power', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'power.store'),
    // validator.validate,
    'Power@store'
])
    .as('power.store');

Router.patch("/power/:id/edit", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "power.update"),
    // validator.validate,
    "Power@update"
]).as("power.update");

Router.get('/power/:power', [
    checkSession,
    Rule.canAsync('user.permision', 'power.show'),
    'Power@show'
])
    .as('power.show');

Router.delete('/power/:power', [
    checkSession,
    Rule.canAsync('user.permision', 'power.destroy'),
    'Power@destroy'
])
    .as('power.destroy');
