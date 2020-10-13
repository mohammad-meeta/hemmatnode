'use strict';

const Rule = use('core/helpers/rule-helper');
const {
    checkSession
} = use('app/helpers/auth-helper');


Router.get("/api/rules/:page/:size?", [
    checkSession,
    Rule.canAsync('user.permision', 'api.rule'),
    "Rule@paginateRule",
]).as("api.rule");
