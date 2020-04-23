'use strict';

const PugView = use('app/helpers/pug-view');
const RoleHelper = use('app/helpers/role-helper');

/**
 * Home controller
 */
function RoleController() {}
module.exports = RoleController;

/**
 * Index route
 */
RoleController.index = async function index(req, res, next) {
    RoleHelper.loadAllRoleData()
        .then(data => {
            const result = {
                success: true,
                data: data
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch(err => console.error(err));
};