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
    return {
        'Query': `
            hello(user: String!) : String
            friend: Friend
        `,
        'Friend': `
            id: ID
            firstName: String
            lastName: String
        `
    };
};

/**
 * Resolvers function
 */
Model.resolvers = function resolvers() {
    return {
        Query: {
            hello: Model.hello,
            friend: Model.friend
        },

        Friend: {

        }
    }
};

/**
 * Hello function
 */
Model.hello = function hello(_, data) {
    return 'Hello  From OjvarLand, ' + data.user;
};

/**
 *.friend function
 */
Model.friend = function friend() {
    return {
        id: 'XXXXXX',
        firstName: 'Ali',
        lastName: 'Gholi'
    };
};
