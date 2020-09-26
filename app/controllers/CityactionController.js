'use strict';
const PugView = use('app/helpers/pug-view');
const CityactionHelper = use('app/helpers/cityaction-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Cityaction() { }
module.exports = Cityaction;

/**
 * Index route
 */
Cityaction.index = async function index(req, res, next) {
    const pageRoute = 'cityaction.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        departmentId: req.params.department,
    });
};
/**
 * paginate route
 */
Cityaction.paginateCityaction = async function paginateCityaction(req, res, next) {
    const group = req.params.group;

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await CityactionHelper.loadAllCityactionCountData(group);
        let count = data.data;

        data = await CityactionHelper.loadAllCityactionData(req, dataPaginate, group);
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
Cityaction.show = async function show(req, res, next) {
    const Id = req.params.cityaction;

    CityactionHelper.loadCityactionData(Id)

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
Cityaction.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    CityactionHelper.deleteCityactionData(data)
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
Cityaction.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('cityaction.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
Cityaction.store = async function store(req, res, next) {
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
        "date": req.body.date,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.departmentId,
        "files": fileList
    };

    CityactionHelper.insertNewCityaction(data)
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
Cityaction.update = async function update(req, res, next) {
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

    let cityactionRes = await CityactionHelper.loadCityactionData(req.body._id);
    const cityactionLFiles = (cityactionRes || {}).files || [];

    for (let index = 0; index < cityactionLFiles.length; index++) {
        const element = cityactionLFiles[index];
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
        "date": req.body.date,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.departmentId,
        "files": fileList
    };

    let result = await CityactionHelper.updateCityactionData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
