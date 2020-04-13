'use strict';
const PasswordGenerator = require('generate-password');
const PugView = use('app/helpers/pug-view');
const UserHelper = use('app/helpers/user-helper');
/**
 * Auth controller
 */
function UserController() { }
module.exports = UserController;

/**
 * Index route
 */
UserController.index = async function index(req, res, next) {
    const pageRoute = 'user.index';
    UserHelper.loadAllUserData()
        .then(data => {
            const result = {
                success: true,
                data: data
            };
            res.render(PugView.getView(pageRoute), {
                req,
                pageRoute,
                result
            });
        })
        .catch(err => console.error(err));
};

/**
 * show route
 */
UserController.show = async function show(req, res, next) {
    const userName = req.params.userData;
    const pageRoute = 'user.show';
    UserHelper.loadUserData(userName)
        .then(data => {
            const result = {
                success: true,
                data: data
            };
            res.render(PugView.getView(pageRoute), {
                req,
                pageRoute,
                result
            });
        })
        .catch(err => console.error(err));
};

/**
 * edit route
 */
UserController.edit = async function edit(req, res, next) {
    const userName = req.params.userData;
    const pageRoute = 'user.show';
    UserHelper.loadUserData(userName)
        .then(data => {
            const result = {
                success: true,
                data: data
            };
            res.render(PugView.getView(pageRoute), {
                req,
                pageRoute,
                result
            });
        })
        .catch(err => console.error(err));
};

/**
 * update data user
 */
UserController.update = async function update(req, res, next) {
    const data = {
        "_id": req.params._id,
        "name": req.params.name,
        "email": req.params.email,
        "cellphone": req.params.cellphone,
        "is_active": req.params.is_active,
        "profile": {
            "first_name": req.params.firstName,
            "last_name": req.params.lastName,
            "nation_code": req.params.nationCode
        }
    };
    console.log(req.params)
    // const UserUpdate = UserHelper.updateUserData(data)
    //     .then(data => {
    //         res.status(200)
    //             .send(data)
    //             .end();
    //     })
    //     .catch(err => console.error(err));
};

/**
 * Create route return page
 */
UserController.create = async function create(req, res, next) {
    const pageRoute = 'user.create';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * store data user
 */
UserController.store = async function store(req, res, next) {
    let password = PasswordGenerator.generate({
        length: 15,
        numbers: true,
        symbols: true
    });

    const data = {
        "name": req.body.name,
        "pwd": password,
        "email": req.body.email,
        "cellphone": req.body.cellphone,
        "is_active": false,
        "profile": {
            "first_name": req.body.firstName,
            "last_name": req.body.lastName,
            "nation_code": req.body.nationCode
        }
    };

    const UserInsert = UserHelper.insertNewUser(data)
        .then(data => {
            res.status(200)
                .send(data)
                .end();
        })
        .catch(err => console.error(err));
};
