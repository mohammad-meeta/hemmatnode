'use strict';

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
    const UsersData = UserHelper.loadAllUserData()
        .then(data => {
            const result = {
                success: true,
                data: data
            }
            res.render(PugView.getView(pageRoute), {
                req,
                pageRoute,
                result
            });
        })
        .catch(err => console.error(err));
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
    // const data = req.params.data;
    
    // AlgorithmHelper.changesFindAlgorithms(type)
    //     .then(data => {
    //         res.status(200)
    //             .send(data)
    //             .end();
    //     })
    //     .catch(err => console.error(err));
};
