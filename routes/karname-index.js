"use strict";
const Rule = use("core/helpers/rule-helper");
// const validator = use('validators/karnameindex-register-validator');

const { checkSession } = use("app/helpers/auth-helper");

const { checkAuth, clearAuth } = use("core/helpers/auth-helper");

Router.get("/karnameindex", [
    checkSession,
    Rule.canAsync("user.permision", "karnameindex.index"),
    "Karnameindex@index",
]).as("karnameindex.index");

Router.get("/api/all/karnameindexs/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.all.karnameindex"),
    "Karnameindex@paginateKarnameindexAll",
]).as("api.all.karnameindex");

Router.get("/karnameindex/create", [
    checkSession,
    Rule.canAsync("user.permision", "karnameindex.create"),
    "Karnameindex@create",
]).as("karnameindex.create");

Router.post("/karnameindex", [
    checkSession,
    Rule.canAsync("user.permision", "karnameindex.store"),
    // validator.validate,
    upload.any(),
    "Karnameindex@store",
]).as("karnameindex.store");

Router.patch("/karnameindex/:id/edit", [
    checkSession,
    Rule.canAsync("user.permision", "karnameindex.update"),
    upload.any(),

    // validator.validate,
    "Karnameindex@update",
]).as("karnameindex.update");

Router.get("/karnameindex/:karnameindex", [
    checkSession,
    Rule.canAsync("user.permision", "karnameindex.show"),
    "Karnameindex@show",
]).as("karnameindex.show");

Router.delete("/karnameindex/:karnameindex", [
    checkSession,
    Rule.canAsync("user.permision", "karnameindex.destroy"),
    "Karnameindex@destroy",
]).as("karnameindex.destroy");
