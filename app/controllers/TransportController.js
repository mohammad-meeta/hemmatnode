'use strict';
const PugView = use('app/helpers/pug-view');
const TransportHelper = use('app/helpers/transport-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Transport() { }
module.exports = Transport;

/**
 * Index route
 */
Transport.index = async function index(req, res, next) {
    const pageRoute = 'transport.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        departmentId: req.params.department,
    });
};
/**
 * paginate route
 */
Transport.paginateTransport = async function paginateTransport(req, res, next) {
    const group = req.params.group;

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await TransportHelper.loadAllTransportCountData(group);
        let count = data.data;

        data = await TransportHelper.loadAllTransportData(req, dataPaginate, group);
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
 * group date transport
 */
Transport.groupDate = async function groupDate(req, res, next) {
    const group = req.params.group;

    const data = await TransportHelper.loadGroupDate(req, group);
    const result = {
        success: true,
        data: data
    };

    res.status(200)
        .send(result)
        .end();
};

/**
 * load data with id
 */
Transport.show = async function show(req, res, next) {
    const Id = req.params.transport;

    TransportHelper.loadTransportData(Id)

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
Transport.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    TransportHelper.deleteTransportData(data)
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
Transport.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('transport.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
Transport.store = async function store(req, res, next) {
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
        "date": req.body.date,
        "status": req.body.status,
        "confirm": req.body.confirm,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.departmentId,
        "files": fileList
    };

    TransportHelper.insertNewTransport(data)
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
Transport.update = async function update(req, res, next) {
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

    let transportRes = await TransportHelper.loadTransportData(req.body._id);
    const transportLFiles = (transportRes || {}).files || [];

    for (let index = 0; index < transportLFiles.length; index++) {
        const element = transportLFiles[index];
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
        "date": req.body.date,
        "status": req.body.status,
        "confirm": req.body.confirm,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.department_id,
        "files": fileList
    };

    let result = await TransportHelper.updateTransportData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
