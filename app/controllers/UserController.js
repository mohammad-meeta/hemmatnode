"use strict";

const PugView = use("app/helpers/pug-view");
const UserHelper = use("app/helpers/user-helper");
/**
 * Auth controller
 */
function UserController() { }
module.exports = UserController;

/**
 * Index route
 */
UserController.index = async function index(req, res, next) {
    const pageRoute = "user.index";

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};
/**
 * paginate route
 */
UserController.paginateUserData = async function paginateUserData(
    req,
    res,
    next
) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    UserHelper.loadAllCountUserData()
        .then(data => {
            let count = data;

            UserHelper.loadAllUserData(dataPaginate)
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
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};

/**
 * show route
 */
UserController.show = async function show(req, res, next) {
    const userName = req.params.userData;
    const pageRoute = "user.show";

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
 * edit page route
 */
UserController.edit = async function edit(req, res, next) {
    const pageRoute = "user.edit";
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
UserController.editUserData = async function editUserData(req, res, next) {
    const userName = req.params.userData;

    UserHelper.loadUserData(userName)
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
 * update data user
 */
UserController.update = async function update(req, res, next) {

    const FileHelper = use("app/helpers/file-helper");
    const files = req.files.files || [];
    const image = req.files.image || [];

    let fileList = [];
    let imageList = [];

    for (let i = 0; i < image.length; ++i) {
        try {
            const el = image[i];
            el.user_id = req.session.auth.userId;

            const data = await FileHelper.insertFileData(el);
            imageList.push(data[0]._id);
        } catch (err) {
            Logger.error(err);
        }
    }

    for (let i = 0; i < files.length; ++i) {
        try {
            const el = files[i];
            el.user_id = req.session.auth.userId;

            const data = await FileHelper.insertFileData(el);
            fileList.push(data[0]._id);
        } catch (err) {
            Logger.error(err);
        }
    }

    let data = {};
    if (req.body.password == undefined) {
        data = {
            _id: req.body._id,
            user_id: req.session.auth.userId,
            name: req.body.name,
            email: req.body.email,
            cellphone: req.body.cellphone,
            role_group_group: JSON.parse(req.body.role_group_group) || [],
            role_group_role: JSON.parse(req.body.role_group_role),
            is_active: req.body.is_active,
            profile: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                nation_code: req.body.nation_code,
                image: imageList[0]
            },
            files: fileList
        };
    } else {
        data = {
            _id: req.body._id,
            user_id: req.session.auth.userId,
            name: req.body.name,
            email: req.body.email,
            pwd: req.body.password,
            role_group_group: JSON.parse(req.body.role_group_group) || [],
            role_group_role: JSON.parse(req.body.role_group_role),
            cellphone: req.body.cellphone,
            is_active: req.body.is_active,
            profile: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                nation_code: req.body.nation_code,
                image: req.body.image || null
            },
            files: fileList
        };
    }
    const UserUpdate = UserHelper.updateUserData(data)
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
 * delete data user
 */
UserController.destroy = async function destroy(req, res, next) {
    const data = {
        _id: req.body._id
    };

    const UserDelete = UserHelper.deleteUserData(data)
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
UserController.create = async function create(req, res, next) {
    const pageRoute = PugView.getView("user.create");

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data user
 */
UserController.store = async function store(req, res, next) {
    const FileHelper = use("app/helpers/file-helper");
    const files = req.files.files || [];
    const image = req.files.image || [];

    let fileList = [];
    let imageList = [];

    for (let i = 0; i < image.length; ++i) {
        try {
            const el = image[i];
            el.user_id = req.session.auth.userId;

            const data = await FileHelper.insertFileData(el);
            imageList.push(data[0]._id);
        } catch (err) {
            Logger.error(err);
        }
    }

    for (let i = 0; i < files.length; ++i) {
        try {
            const el = files[i];
            el.user_id = req.session.auth.userId;

            const data = await FileHelper.insertFileData(el);
            fileList.push(data[0]._id);
        } catch (err) {
            Logger.error(err);
        }
    }

    const data = {
        name: req.body.name,
        user_id: req.session.auth.userId,
        pwd: req.body.password,
        email: req.body.email,
        role_group_group: JSON.parse(req.body.role_group_group) || [],
        role_group_role: JSON.parse(req.body.role_group_role) || [],
        cellphone: req.body.cellphone,
        is_active: req.body.is_active || false,
        profile: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            nation_code: req.body.nation_code,
            image: imageList[0]
        },
        files: fileList
    };

    const UserInsert = UserHelper.insertNewUser(data)
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
