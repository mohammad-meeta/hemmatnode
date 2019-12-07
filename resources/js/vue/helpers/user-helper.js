'use strict';

/**
 * User Helper class
 */
function UserHelper() {}
module.exports = UserHelper;


/**
 * Load all users data (with pagination)
 */
UserHelper.loadUsers = function loadUsers(payload) {
    const route = routes.route('gql');

    const query = AxiosHelper.toGQL(`
    query {
        users(index:1, size: 10){
            id
            name
            email
            created_at
            updated_at
        }
    }
`);

    return AxiosHelper.send(route.method, route.url, query, {});
};