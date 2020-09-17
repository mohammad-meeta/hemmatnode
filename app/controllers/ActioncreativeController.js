'use strict';
const PugView = use('app/helpers/pug-view');
const ActioncreativeHelper = use('app/helpers/actioncreative-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Actioncreative() { }
module.exports = Actioncreative;

/**
 * Index route
 */
Actioncreative.index = async function index(req, res, next) {
    const pageRoute = 'actioncreative.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        departmentId: req.params.department,
    });
};
/**
 * paginate route
 */
Actioncreative.paginateActioncreative = async function paginateActioncreative(req, res, next) {
    const group = req.params.group;

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await ActioncreativeHelper.loadAllActioncreativeCountData(group);
        let count = data.data;

        data = await ActioncreativeHelper.loadAllActioncreativeData(req, dataPaginate, group);
        result = {
            success: true,
            data: {
                data: data,
                count: count
            }
        };

        res.status(200)
            .send(result)
            .end();

    }
    catch (err) {

        Logger.error(err);

        res.status(500)
            .send(err)
            .end();
    }
};
/**
 * load data with id
 */
Actioncreative.show = async function show(req, res, next) {
    const Id = req.params.actioncreative;

    ActioncreativeHelper.loadActioncreativeData(Id)

        .then(data => {
            const result = {
                success: true,
                data: {
                    data: data,
                }
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch(err => console.error(err));
};

/**
 * delete data dep cat
 */
Actioncreative.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    ActioncreativeHelper.deleteActioncreativeData(data)
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
Actioncreative.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('actioncreative.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
Actioncreative.store = async function store(req, res, next) {
    const files = req.files || [];
    let fileList = [];

    for (let i = 0; i < files.length; ++i) {
        try {
            const el = files[i];
            el.user_id = req.session.auth.userId;

            const data = await FileHelper.insertFileData(el);

            const tempFileData = {
                file_id: data[0]._id,
                deleted_at: null,
            };
            fileList.push(tempFileData);
        } catch (err) {
            Logger.error(err);
        }
    }

    const data = {
        "title": req.body.title,
        "description": req.body.description,
        "reason": req.body.reason,
        "responsible": req.body.responsible,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.departmentId,
        "files": fileList
    };

    ActioncreativeHelper.insertNewActioncreative(data)
        .then(dataRes => {
            const result = {
                success: true,
                data: dataRes
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch(err => console.error(err));
};

/**
 * update data
 */
Actioncreative.update = async function update(req, res, next) {
    let data = {};
    const files = req.files || [];
    let fileList = [];

    for (let i = 0; i < files.length; ++i) {
        try {
            const el = files[i];
            el.user_id = req.session.auth.userId;

            const data = await FileHelper.insertFileData(el);

            const tempFileData = {
                file_id: data[0]._id,
                deleted_at: null,
            };
            fileList.push(tempFileData);
        } catch (err) {
            Logger.error(err);
        }
    }

    const deletedOldFiles = JSON.parse(req.body.deletedOldFiles || null) || [];

    let actioncreativeRes = await ActioncreativeHelper.loadActioncreativeData(req.body._id);
    const actioncreativeLFiles = (actioncreativeRes || {}).files || [];

    for (let index = 0; index < actioncreativeLFiles.length; index++) {
        const element = actioncreativeLFiles[index];
        fileList.push(element)
    }

    for (let index = 0; index < deletedOldFiles.length; index++) {
        const element = deletedOldFiles[index];
        for (let oil = 0; oil < fileList.length; oil++) {
            const Fele = fileList[oil];
            if (Fele.file_id == element) {
                Fele.deleted_at = Date()
            }
        }
    }

    data = {
        "_id": req.body._id,
        "title": req.body.title,
        "description": req.body.description,
        "reason": req.body.reason,
        "responsible": req.body.responsible,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.departmentId,
        "files": fileList
    };

    let result = await ActioncreativeHelper.updateActioncreativeData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
