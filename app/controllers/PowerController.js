'use strict';
const PugView = use('app/helpers/pug-view');
const PowerHelper = use('app/helpers/power-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Power() { }
module.exports = Power;

/**
 * Index route
 */
Power.index = async function index(req, res, next) {
    const pageRoute = 'power.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
    });
};
/**
 * paginate route
 */
Power.paginatePower = async function paginatePower(req, res, next) {

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await PowerHelper.loadAllPowerCountData();
        let count = data.data;

        data = await PowerHelper.loadAllPowerData(req, dataPaginate);
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
 * paginate all route
 */
Power.paginatePowerAll = async function paginatePowerAll(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await PowerHelper.loadAllPowerCountDataAll();
        let count = data.data;

        data = await PowerHelper.loadAllPowerDataAll(req, dataPaginate);
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
 * paginate by year route
 */
Power.paginatePowerYear = async function paginatePowerYear(req, res, next) {

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await PowerHelper.loadAllPowerCountYearData();
        let count = data.data;

        data = await PowerHelper.loadAllPowerYearData(req, dataPaginate);
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
 * group date power
 */
Power.groupDate = async function groupDate(req, res, next) {

    const data = await PowerHelper.loadGroupDate(req);
    const result = {
        success: true,
        data: data
    };

    res.status(200)
        .send(result)
        .end();
};

/**
 * show route
 */
/**
 * load data with id
 */
Power.show = async function show(req, res, next) {
    const Id = req.params.power;

    PowerHelper.loadPowerData(Id)

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
Power.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    PowerHelper.deletePowerData(data)
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
Power.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('power.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
Power.store = async function store(req, res, next) {
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
        'duration': req.body.duration,
        'satisfaction': req.body.satisfaction,
        'information': req.body.information,
        'contacts': JSON.parse(req.body.contacts),
        "description": req.body.description,
        "date": req.body.date,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "files": fileList
    };

    PowerHelper.insertNewPower(data)
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
Power.update = async function update(req, res, next) {
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

    let powerRes = await PowerHelper.loadPowerData(req.body._id);
    const powerLFiles = (powerRes || {}).files || [];

    for (let index = 0; index < powerLFiles.length; index++) {
        const element = powerLFiles[index];
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
        'duration': req.body.duration,
        'satisfaction': req.body.satisfaction,
        'information': req.body.information,
        'contacts': JSON.parse(req.body.contacts),
        "description": req.body.description,
        "date": req.body.date,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "files": fileList
    };

    let result = await PowerHelper.updatePowerData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
