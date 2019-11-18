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
                helloWorld : String
            `
    }];
};

/**
 * Resolvers function
 */
Model.resolvers = function resolvers() {
    return {
        Query: {
            helloWorld: Model.helloWorld,
        }
    }
};

/**
 * Users list function
 */
Model.helloWorld = function helloWorld() {
    return 'Hello world';
};
