'use strict';

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

Router.get("/api/response/dashboard/userid/:page/:size?/", [
    checkSession,
    "Response@paginateResponseUser"
]).as("api.response.dashboard");
