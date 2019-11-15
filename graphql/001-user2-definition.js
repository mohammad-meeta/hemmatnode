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
            hello2(user: String!) : String
        `
    };
};

/**
 * Resolvers function
 */
Model.resolvers = function resolvers() {
    return {
        Query: {
            hello2: Model.hello
        }
    }
};

/**
 * Hello function
 */
Model.hello = function hello(_, data) {
    return 'Hello(2) ' + data.user;
};
