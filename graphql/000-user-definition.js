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
                'users(index: Int, size: Int) : [User]',
                'attempt(user:InputUser): Attempt'
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
            category: 'Attempt',
            schema: `
                success: Boolean
                token: String`
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
            users: Model.users,
            attempt: Model.attempt
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
    const UserModel = mongoose.model('User');

    payload = Object.assign({
        index: 1,
        size: 10
    }, payload);

    const users = await UserModel.find();

    return users;
};

/**
 * Attemp to login
 */
Model.attempt = async function attempt(_, payload) {
    const AuthHelper = use('core/helpers/auth-helper');
    const UserModel = mongoose.model('User');
    let user;

    try {
        user = await UserModel.attempt(payload);

        if (user) {
            user = {
                id: user._id.toString(),
                name: user.name
            };

            user = AuthHelper.sign(user);

            user = {
                success: true,
                token: user
            };
        }
    } catch (error) {
        Logger.error(error);
    }

    if (null == user) {
        user = {
            success: false,
            token: ''
        };
    }

    return user;
};

/**
 * Insert new user
 *
 * @param      {Object}  user    The user data
 */
Model.insertUser = async function insertUser(_, data) {
    const UserModel = mongoose.model('User');

    /* prepare user data */
    let user = {
        ...data.user,
        pwd: data.user.password
    };

    const newUser = await UserModel.newUser(user);

    return newUser;
};
