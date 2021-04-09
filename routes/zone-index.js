"use strict";
const Rule = use("core/helpers/rule-helper");
// const validator = use('validators/zoneindex-register-validator');

const { checkSession } = use("app/helpers/auth-helper");

const { checkAuth, clearAuth } = use("core/helpers/auth-helper");

Router.get("/zoneindex", [
    checkSession,
    Rule.canAsync("user.permision", "zoneindex.zoneindex"),
    "Zoneindex@index",
]).as("zoneindex.index");

Router.get("/api/zoneindexs/:type/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.zoneindex"),
    "Zoneindex@paginateZoneindex",
]).as("api.zoneindex");

Router.get("/api/all/zoneindexs/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.all.zoneindex"),
    "Zoneindex@paginateZoneindexAll",
]).as("api.all.zoneindex");

Router.get("/zoneindex/create", [
    checkSession,
    Rule.canAsync("user.permision", "zoneindex.create"),
    "Zoneindex@create",
]).as("zoneindex.create");

Router.post("/zoneindex", [
    checkSession,
    Rule.canAsync("user.permision", "zoneindex.store"),
    // validator.validate,
    upload.any(),
    "Zoneindex@store",
]).as("zoneindex.store");

Router.patch("/zoneindex/:id/edit", [
    checkSession,
    Rule.canAsync("user.permision", "zoneindex.update"),
    upload.any(),

    // validator.validate,
    "Zoneindex@update",
]).as("zoneindex.update");

Router.get("/zoneindex/:zoneindex", [
    checkSession,
    Rule.canAsync("user.permision", "zoneindex.show"),
    "Zoneindex@show",
]).as("zoneindex.show");

Router.delete("/zoneindex/:zoneindex", [
    checkSession,
    Rule.canAsync("user.permision", "zoneindex.destroy"),
    "Zoneindex@destroy",
]).as("zoneindex.destroy");
