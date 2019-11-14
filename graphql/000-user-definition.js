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
    return `
        type Query {
            hello(user: String!) : String
        }
    `;
};

/**
 * Resolvers function
 */
Model.resolvers = function resolvers() {
    return {
        Query: {
            hello: Model.hello
        }
    }
};

/**
 * Hello function
 */
Model.hello = function hello(_, data) {
    return 'Hello ' + data.user;
};
