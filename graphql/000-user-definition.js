'use strict';

/**
 * Model class
 */
function Model() {}
module.exports = Model;

/**
 * Init function
 */
Model.init = function init() {
    return {
        typeDefs: Model.typeDefs,
        resolvers: Model.resolvers
    };
};

/**
 * typeDefs Model
 */
Model.typeDefs = function typeDefs() {
    return [{
            type: 'type',
            name: 'Query',
            schema: `
                users(index: Int, size: Int) : [User]
            `
        },
        {
            type: 'type',
            name: 'Mutation',
            schema: `
                insertUser(user: InputUser) : [User]
            `
        },
        {
            type: 'type',
            name: 'User',
            schema: `
                id: ID
                name: String
                email: String
                created_at: String
                updated_at: String
            `
        },
        {
            type: 'input',
            name: 'InputUser',
            schema: `
                id: ID
                name: String
                email: String
                created_at: String
                updated_at: String
            `
        }
    ];
};

/**
 * Resolvers function
 */
Model.resolvers = function resolvers() {
    return {
        Query: {
            users: Model.users,
        },
        Mutation: {
            insertUser: Model.insertUser
        }
    }
};

/**
 * Users list function
 */
Model.users = function users(_, payload) {
    payload = Object.assign({
        index: 1,
        size: 10
    }, payload);

    return [{
            id: '1',
            name: 'user 1',
            pwd: '123456',
            email: 'user1@tasktracker.dev',
            created_at: '2020-01-01T10:10:10',
            updated_at: '2020-01-01T10:10:10'
        },
        {
            id: '2',
            name: 'user 2',
            pwd: '123456',
            email: 'user2@tasktracker.dev',
            created_at: '2020-01-01T10:10:10',
            updated_at: '2020-01-01T10:10:10'
        }
    ];
};

/**
 * Insert new user
 *
 * @param      {Object}  user    The user data
 */
Model.insertUser = function insertUser(user) {
    return {};
};
