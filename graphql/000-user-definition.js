'use strict';

const mongoose = require('mongoose');

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
            schema: [
                'users(index: Int, size: Int) : [User]'
            ]
        },
        {
            category: 'Mutation',
            schema: 'insertUser(user: InputUser) : User'
        },
        {
            category: 'User',
            schema: `
                id: ID
                name: String
                email: String
                created_at: String
                updated_at: String`
        },
        {
            type: 'input',
            category: 'InputUser',
            schema: `
                name: String
                email: String
                password: String`
        }
    ];
};

/**
 * Resolvers function
 */
Model.resolvers = function resolvers() {
    return {
        Query: {
            users: Model.users
        },
        Mutation: {
            insertUser: Model.insertUser
        }
    }
};

/**
 * Users list function
 */
Model.users = async function users(_, payload) {
    payload = Object.assign({
        index: 1,
        size: 10
    }, payload);

    const UserModel = mongoose.model('User');
    const users = await UserModel.find();

    return users;
};

/**
 * Insert new user
 *
 * @param      {Object}  user    The user data
 */
Model.insertUser = async function insertUser(_, data) {
    /* prepare user data */
    let user = {
        ...data.user,
        pwd: data.user.password
    };

    const UserModel = mongoose.model('User');
    const newUser = await UserModel.newUser(user);

    return newUser;
};