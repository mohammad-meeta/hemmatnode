'use strict';
const PugView = use('app/helpers/pug-view');
const RegulationHelper = use('app/helpers/department-regulation-helper');
const FileHelper = use('app/helpers/file-helper');

/**
 * Dep cat controller
 */
function Regulation() { }
module.exports = Regulation;

/**
 * Index route
 */
Regulation.index = async function index(req, res, next) {
    const pageRoute = 'department.regulation.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        departmentId: req.params.department,
        year: req.params.year,
    });
};
/**
 * paginate route
 */
Regulation.paginateRegulation = async function paginateRegulation(req, res, next) {
    const group = req.params.group;

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await RegulationHelper.loadAllRegulationCountData(group);
        let count = data.data;

        data = await RegulationHelper.loadAllRegulationData(req, dataPaginate, group);
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
Regulation.paginateRegulationYear = async function paginateRegulationYear(req, res, next) {
    const group = req.params.group;
    const year = req.params.year;

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await RegulationHelper.loadAllRegulationCountYearData(group, year);
        let count = data.data;

        data = await RegulationHelper.loadAllRegulationYearData(req, dataPaginate, group, year);
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
 * group date regulation
 */
Regulation.groupDate = async function groupDate(req, res, next) {
    const group = req.params.group;

    const data = await RegulationHelper.loadGroupDate(req, group);
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
Regulation.show = async function show(req, res, next) {
    const Id = req.params.regulation;

    RegulationHelper.loadRegulationData(Id)

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
Regulation.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    RegulationHelper.deleteRegulationData(data)
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
Regulation.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('department.regulation.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
Regulation.store = async function store(req, res, next) {
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
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.departmentId,
        "files": fileList
    };

    RegulationHelper.insertNewRegulation(data)
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
Regulation.update = async function update(req, res, next) {
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

    let regulationRes = await RegulationHelper.loadRegulationData(req.body._id);
    const regulationLFiles = (regulationRes || {}).files || [];

    for (let index = 0; index < regulationLFiles.length; index++) {
        const element = regulationLFiles[index];
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
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.departmentId,
        "files": fileList
    };

    let result = await RegulationHelper.updateRegulationData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
