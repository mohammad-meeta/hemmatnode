"use strict";
const Rule = use("core/helpers/rule-helper");
// const validator = use('validators/actionscore-register-validator');

const { checkSession } = use("app/helpers/auth-helper");

const { checkAuth, clearAuth } = use("core/helpers/auth-helper");

Router.get("/actionscore", [
    checkSession,
    Rule.canAsync("user.permision", "actionscore.actionscore"),
    "Actionscore@index",
]).as("actionscore.index");

Router.get("/api/actionscores/:type/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.actionscore"),
    "Actionscore@paginateActionscore",
]).as("api.actionscore");

Router.get("/api/all/actionscores/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.all.actionscore"),
    "Actionscore@paginateActionscoreAll",
]).as("api.all.actionscore");

Router.get("/actionscore/create", [
    checkSession,
    Rule.canAsync("user.permision", "actionscore.create"),
    "Actionscore@create",
]).as("actionscore.create");

Router.post("/actionscore", [
    checkSession,
    Rule.canAsync("user.permision", "actionscore.store"),
    // validator.validate,
    upload.any(),
    "Actionscore@store",
]).as("actionscore.store");

Router.patch("/actionscore/:id/edit", [
    checkSession,
    Rule.canAsync("user.permision", "actionscore.update"),
    upload.any(),

    // validator.validate,
    "Actionscore@update",
]).as("actionscore.update");

Router.get("/actionscore/:actionscore", [
    checkSession,
    Rule.canAsync("user.permision", "actionscore.show"),
    "Actionscore@show",
]).as("actionscore.show");

Router.delete("/actionscore/:actionscore", [
    checkSession,
    Rule.canAsync("user.permision", "actionscore.destroy"),
    "Actionscore@destroy",
]).as("actionscore.destroy");
