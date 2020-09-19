"use strict";
const validator = use("validators/project-register-validator");
const Rule = use("core/helpers/rule-helper");
var multer = require("multer");
const upload = multer({
    dest: "uploads/",
});

const { checkSession } = use("app/helpers/auth-helper");

const { checkAuth, clearAuth } = use("core/helpers/auth-helper");

Router.get("/project/:department/:type", [
    checkSession,
    Rule.canAsync("user.permision", "project.index"),
    "Project@index",
]).as("project.index");

Router.get("/api/projects/:group/:type/:page/:size?", [
    checkSession,
    "Project@paginateProject",
]).as("api.project");

Router.get("/project/create", [
    checkSession,
    Rule.canAsync("user.permision", "project.create"),
    "Project@create",
]).as("project.create");

Router.get("/project/edit", [
    checkSession,
    Rule.canAsync("user.permision", "project.edit"),
    "Project@edit",
]).as("project.edit");

Router.post("/project", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "project.store"),
    // validator.validate,
    "Project@store",
]).as("project.store");

Router.get("/project/:project", [
    checkSession,
    Rule.canAsync("user.permision", "project.show"),
    "Project@show",
]).as("project.show");

Router.get("/api/project/:project/edit", [
    checkSession,
    Rule.canAsync("user.permision", "api.project.edit"),
    "Project@editProjectData",
]).as("api.project.edit");

Router.patch("/project/:id", [
    checkSession,
    Rule.canAsync("user.permision", "project.update"),
    upload.array("files"),
    // validator.validate,
    "Project@update",
]).as("project.update");

Router.delete("/project/:project", [
    checkSession,
    Rule.canAsync("user.permision", "project.destroy"),
    "Project@destroy",
]).as("project.destroy");
