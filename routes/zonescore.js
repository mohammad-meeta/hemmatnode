"use strict";
const Rule = use("core/helpers/rule-helper");
// const validator = use('validators/zonescore-register-validator');

const { checkSession } = use("app/helpers/auth-helper");

const { checkAuth, clearAuth } = use("core/helpers/auth-helper");

Router.get("/zonescore", [
    checkSession,
    Rule.canAsync("user.permision", "zonescore.zonescore"),
    "Zonescore@index",
]).as("zonescore.index");

Router.get("/api/zonescores/:type/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.zonescore"),
    "Zonescore@paginateZonescore",
]).as("api.zonescore");

Router.get("/api/all/zonescores/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.all.zonescore"),
    "Zonescore@paginateZonescoreAll",
]).as("api.all.zonescore");

Router.get("/zonescore/create", [
    checkSession,
    Rule.canAsync("user.permision", "zonescore.create"),
    "Zonescore@create",
]).as("zonescore.create");

Router.post("/zonescore", [
    checkSession,
    Rule.canAsync("user.permision", "zonescore.store"),
    // validator.validate,
    upload.any(),
    "Zonescore@store",
]).as("zonescore.store");

Router.patch("/zonescore/:id/edit", [
    checkSession,
    Rule.canAsync("user.permision", "zonescore.update"),
    upload.any(),

    // validator.validate,
    "Zonescore@update",
]).as("zonescore.update");

Router.get("/zonescore/:zonescore", [
    checkSession,
    Rule.canAsync("user.permision", "zonescore.show"),
    "Zonescore@show",
]).as("zonescore.show");

Router.delete("/zonescore/:zonescore", [
    checkSession,
    Rule.canAsync("user.permision", "zonescore.destroy"),
    "Zonescore@destroy",
]).as("zonescore.destroy");
