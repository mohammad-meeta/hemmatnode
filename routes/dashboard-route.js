'use strict';
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

Router.get('/dashboard', [
    checkSession,
    'Dashboard@index'
])
    .as('dashboard.index');

Router.get("/api/invite-session/dashboard/userid/:page/:size?/", [
    checkSession,
    "InviteSession@paginateInviteSessionUser"
]).as("api.invitesession.dashboard");

Router.get("/api/invite-session/all/dashboard/:page/:size?/", [
    checkSession,
    Rule.canAsync('user.permision', 'api.invitesession.all.dashboard'),
    "InviteSession@paginateAllInviteSessionUser"
]).as("api.invitesession.all.dashboard");

Router.get("/api/response/dashboard/userid/:page/:size?/", [
    checkSession,
    "Response@paginateResponseUser"
]).as("api.response.dashboard");
