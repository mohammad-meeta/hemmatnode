'use strict';

const AuthHelper = use('core/helpers/auth-helper');

Router.use('/gql', [
    AuthHelper.checkAuth,
    'GraphQLController@run'
]);
