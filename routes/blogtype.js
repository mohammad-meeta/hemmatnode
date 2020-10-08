"use strict";
const Rule = use("core/helpers/rule-helper");
// const validator = use('validators/blogtype-register-validator');

const { checkSession } = use("app/helpers/auth-helper");

const { checkAuth, clearAuth } = use("core/helpers/auth-helper");

Router.get("/blogtype", [
    checkSession,
    Rule.canAsync("user.permision", "blogtype.index"),
    "Blogtype@index",
]).as("blogtype.index");

Router.get("/api/blogtypes/:type/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.blogtype"),
    "Blogtype@paginateBlogtype",
]).as("api.blogtype");

Router.get("/api/all/blogtypes/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.all.blogtype"),
    "Blogtype@paginateBlogtypeAll",
]).as("api.all.blogtype");

Router.get("/blogtype/create", [
    checkSession,
    Rule.canAsync("user.permision", "blogtype.create"),
    "Blogtype@create",
]).as("blogtype.create");

Router.post("/blogtype", [
    checkSession,
    Rule.canAsync("user.permision", "blogtype.store"),
    // validator.validate,
    upload.any(),
    "Blogtype@store",
]).as("blogtype.store");

Router.patch("/blogtype/:id/edit", [
    checkSession,
    Rule.canAsync("user.permision", "blogtype.update"),
    upload.any(),

    // validator.validate,
    "Blogtype@update",
]).as("blogtype.update");

Router.get("/blogtype/:blogtype", [
    checkSession,
    Rule.canAsync("user.permision", "blogtype.show"),
    "Blogtype@show",
]).as("blogtype.show");

Router.delete("/blogtype/:blogtype", [
    checkSession,
    Rule.canAsync("user.permision", "blogtype.destroy"),
    "Blogtype@destroy",
]).as("blogtype.destroy");
