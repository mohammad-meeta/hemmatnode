'use strict';

const appConfig = use('config', 'app');
const {
    makeExecutableSchema
} = require('graphql-tools');


/**
 * GraphQL Controller class
 */
function GraphQLController() {}
module.exports = GraphQLController;

/**
 * GrpahQL run method
 */
GraphQLController.run = function run(req, res, next) {
    const graphqlHTTP = require('express-graphql');

    return graphqlHTTP({
        schema: makeExecutableSchema(GraphQLController.schema),
        graphiql: GraphQLController.graphiql
    })(req, res, next);
};

/**
 * Prepare schemas
 */
GraphQLController.prepareSchemas = function prepareSchemas() {
    const _ = require('lodash');
    const fs = require('fs');
    let schema = {
        typeDefs: "",
        resolvers: {}
    }

    /* Query models */
    const files = fs.readdirSync(rPath("graphql")) || [];
    const typeDefsCollection = {};

    files.forEach(file => {
        const gqlModule = use("graphql", file);
        const initData = gqlModule.init();

        schema.resolvers = _.merge(schema.resolvers, initData.resolvers());

        let typeDefs = initData.typeDefs();
        Object.keys(typeDefs)
            .forEach(key => {
                if (typeDefsCollection[key]) {
                    typeDefsCollection[key] += `${typeDefs[key]} \n`;
                }
                else {
                    typeDefsCollection[key] = typeDefs[key];
                }
            });
    });

    Object.keys(typeDefsCollection)
        .forEach(key => schema.typeDefs += `type ${key} { ${typeDefsCollection[key]} }`);

    /* Generate schema */
    schema = {
        typeDefs: schema.typeDefs,
        resolvers: schema.resolvers
    };

    return schema;
};

/* Prepare data */
GraphQLController.graphiql = appConfig.debug || false;
GraphQLController.schema = GraphQLController.prepareSchemas();
