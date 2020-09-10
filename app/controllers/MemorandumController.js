'use strict';
const PugView = use('app/helpers/pug-view');
const MemorandumHelper = use('app/helpers/memorandum-helper');
const FileHelper = use('app/helpers/file-helper');
const ProjectHelper = use('app/helpers/project-helper')
const ResultHelper = use('app/helpers/result-helper')
/**
 * Dep cat controller
 */
function Memorandum() { }
module.exports = Memorandum;

/**
 * Index route
 */
Memorandum.index = async function index(req, res, next) {
    const pageRoute = 'memorandum.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        departmentId: req.params.department
    });
};
/**
 * paginate route
 */
Memorandum.paginateMemorandum = function paginateMemorandum(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };
    const group = req.params.group;

    MemorandumHelper.loadAllMemorandumCountData(group)
        .then(data => {
            let count = data.data;

            MemorandumHelper.loadAllMemorandumData(req, dataPaginate, group)
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
Memorandum.show = async function show(req, res, next) {
    const SessionTitle = req.params.sessionData;
    const pageRoute = 'memorandum.show';
    MemorandumHelper.loadMemorandumData(SessionTitle)
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
Memorandum.edit = async function edit(req, res, next) {
    const pageRoute = 'memorandum.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
Memorandum.editMemorandumData = async function editMemorandumData(req, res, next) {
    const id = req.params.sessionData;

    MemorandumHelper.loadMemorandumData(id)
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
 * update data dep cat
 */
Memorandum.update = async function update(req, res, next) {
    let data = {};
    const files = req.files.files || [];
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

    let memorandumRes = await MemorandumHelper.loadMemorandumData(req.body._id);
    const MemorandomFiles = (memorandumRes || {}).files || [];

    for (let index = 0; index < MemorandomFiles.length; index++) {
        const element = MemorandomFiles[index];
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
        "body": req.body.body,
        "title": req.body.title,
        "date": req.body.date,
        "conditions": req.body.conditions,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.department_id,
        "files": fileList
    };

    MemorandumHelper.updateMemorandumData(data)
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
 * delete data dep cat
 */
Memorandum.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    MemorandumHelper.deleteMemorandumData(data)
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
Memorandum.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('memorandum.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data dep cat
 */
Memorandum.store = async function store(req, res, next) {

    const files = req.files || [];

    let fileList = [];

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
        "title": req.body.title,
        "body": req.body.body,
        "date": req.body.date,
        "conditions": req.body.conditions,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active || true,
        "department_id": req.body.department_id,
        "files": fileList
    };

    const project = JSON.parse(req.body.project);

    MemorandumHelper.insertNewMemorandum(data)
        .then(dataRes => {

            project.forEach(element => {

                const proje = {
                    "title": element.title,
                    "budget": element.budget,
                    "supply": element.supply,
                    "department_id": data.department_id,
                    "memorandum_id": dataRes._id,
                    "user_id": req.session.auth.userId,
                };
                const result = element.result;

                ProjectHelper.insertNewProject(proje)
                    .then(prDataRes => {

                        result.forEach(resElement => {
                            const resData = {
                                "result": resElement.title,
                                "project_id": prDataRes._id,
                                "user_id": req.session.auth.userId,
                            };

                            ResultHelper.insertNewResult(resData)
                                .then(resDataRes => {
                                    console.log("ok");
                                })
                                .catch(err => console.error(err));
                        });

                    })
                    .catch(err => console.error(err));
            });

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