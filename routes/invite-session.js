"use strict";
// const validator = use('validators/invite-session-register-validator');
const Rule = use("core/helpers/rule-helper");
const multer = require("multer");
const upload = multer({
    dest: "uploads/"
});

const { checkSession } = use("app/helpers/auth-helper");
const { checkAuth, clearAuth } = use("core/helpers/auth-helper");

Router.get("/invite-session/:department?", [
    checkSession,
    Rule.canAsync("user.permision", "invitesession.index"),
    "InviteSession@index"
]).as("invitesession.index");

Router.get("/api/invite-session/:group/:page/:size?/", [
    checkSession,
    "InviteSession@paginateInviteSession"
]).as("api.invitesession");

Router.get("/invite-session/create", [
    checkSession,
    Rule.canAsync("user.permision", "invitesession.create"),
    "InviteSession@create"
]).as("invitesession.create");

Router.get("/invite-session/edit", [
    checkSession,
    Rule.canAsync("user.permision", "invitesession.edit"),
    "InviteSession@edit"
]).as("invitesession.edit");

Router.post("/invite-session/:department?", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "invitesession.store"),
    // validator.validate,
    "InviteSession@store"
]).as("invitesession.store");

Router.post("/invite-session/approves/:session?", [
    upload.array("files"),
    upload.array("signatured"),
    checkSession,
    Rule.canAsync("user.permision", "invitesession.approves.store"),
    "InviteSession@approvesStore"
]).as("invitesession.approves.store");

Router.get("/invite-session/:invitesession", [
    checkSession,
    Rule.canAsync("user.permision", "invitesession.show"),
    "InviteSession@show"
]).as("invitesession.show");

Router.get("/api/invite-session/:invitesession/edit", [
    checkSession,
    Rule.canAsync("user.permision", "api.invitesession.edit"),
    "InviteSession@editInviteSessionData"
]).as("api.invitesession.edit");

Router.post("/invite-session/:id/edit", [
    upload.fields([{
        name: 'files', maxCount: 10
    }, {
        name: 'signatured', maxCount: 10
    }]),
    checkSession,
    Rule.canAsync("user.permision", "invitesession.update"),
    // validator.validate,
    "InviteSession@update"
]).as("invitesession.update");

Router.delete("/invite-session/:invitesession", [
    checkSession,
    Rule.canAsync("user.permision", "invitesession.destroy"),
    "InviteSession@destroy"
]).as("invitesession.destroy");
