'use strict';
const PugView = use('app/helpers/pug-view');
const RoleHelper = use('app/helpers/role-helper');
/**
 * Auth controller
 */
function RoleController() { }
module.exports = RoleController;

/**
 * Index route
 */
RoleController.index = async function index(req, res, next) {
    const pageRoute = 'role.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};
/**
 * paginate route
 */
RoleController.paginateRoleData = async function paginateRoleData(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    RoleHelper.loadAllCountRoleData()
        .then(data => {
            let count = data.data;

            RoleHelper.loadAllRoleData(dataPaginate)
                .then(data => {
                    const result = {
                        success: true,
                        data: {
                            data: data,
                            count: count
                        }
                    };

                    res.status(200)
                        .send(result)
                        .end();
                })
                .catch(err => {
                    Logger.error(err);

                    res.status(500)
                        .send(err)
                        .end();
                });
        })
        .catch(err => {
            Logger.error(err);

            res.status(500)
                .send(err)
                .end();
        });
};

/**
 * show route
 */
RoleController.show = async function show(req, res, next) {
    const userName = req.params.userData;
    const pageRoute = 'role.show';
    RoleHelper.loadRoleData(userName)
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
 * edit page route
 */
RoleController.edit = async function edit(req, res, next) {
    const pageRoute = 'role.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
RoleController.editRoleData = async function editRoleData(req, res, next) {
    const roleData = req.params.roleData;

    RoleHelper.loadRoleData(roleData)
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

/**
 * update data role
 */
RoleController.update = async function update(req, res, next) {
    const data = {
        "_id": req.body._id,
        "user_id": req.session.auth.userId,
        "name": req.body.name,
        "permision": JSON.parse(req.body.permision),
        "is_active": req.body.is_active
    };

    const RoleUpdate = RoleHelper.updateRoleData(data)
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

/**
 * delete data role
 */
RoleController.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    const RoleDelete = RoleHelper.deleteRoleData(data)
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

/**
 * Create route return page
 */
RoleController.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('role.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data role
 */
RoleController.store = async function store(req, res, next) {

    const data = {
        "user_id": req.session.auth.userId,
        "name": req.body.name,
        "permision": JSON.parse(req.body.permision),
        "is_active": req.body.is_active || true
    };

    const RoleInsert = RoleHelper.insertNewRole(data)
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