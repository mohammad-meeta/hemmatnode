'use strict';
const PugView = use('app/helpers/pug-view');
const ProjectTafahomHelper = use('app/helpers/project-tafahom-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function ProjectTafahom() { }
module.exports = ProjectTafahom;

/**
 * Index route
 */
ProjectTafahom.index = async function index(req, res, next) {
    const pageRoute = 'projecttafahom.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        departmentId: req.params.department,
    });
};
/**
 * paginate route
 */
ProjectTafahom.paginateProjectTafahom = async function paginateProjectTafahom(req, res, next) {
    const group = req.params.group;

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await ProjectTafahomHelper.loadAllProjectTafahomCountData(group);
        let count = data.data;

        data = await ProjectTafahomHelper.loadAllProjectTafahomData(req, dataPaginate, group);
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
ProjectTafahom.show = async function show(req, res, next) {
    const Id = req.params.projecttafahom;

    ProjectTafahomHelper.loadProjectTafahomData(Id)

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
ProjectTafahom.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    ProjectTafahomHelper.deleteProjectTafahomData(data)
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
ProjectTafahom.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('projecttafahom.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
ProjectTafahom.store = async function store(req, res, next) {
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
        "user_id": req.session.auth.userId,
        "department_id": req.body.departmentId,
        "is_active": req.body.is_active,
        "files": fileList,
    };

    ProjectTafahomHelper.insertNewProjectTafahom(data)
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
ProjectTafahom.update = async function update(req, res, next) {
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

    let projecttafahomRes = await ProjectTafahomHelper.loadProjectTafahomData(req.body._id);
    const projecttafahomLFiles = (projecttafahomRes || {}).files || [];

    for (let index = 0; index < projecttafahomLFiles.length; index++) {
        const element = projecttafahomLFiles[index];
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
        "department_id": req.body.department_id,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "files": fileList,
    };

    let result = await ProjectTafahomHelper.updateProjectTafahomData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
