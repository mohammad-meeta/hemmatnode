'use strict';
const PugView = use('app/helpers/pug-view');
const DepartmentHelper = use('app/helpers/department-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Department() { }
module.exports = Department;

/**
 * Index route
 */
Department.index = async function index(req, res, next) {
    const pageRoute = 'department.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * paginate route
 */
Department.paginateDepartment = async function paginateDepartment(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    let count = 0;
    DepartmentHelper.loadAllCountDepartmentData()
        .then(data => {
            count = data;

            DepartmentHelper.loadAllDepartmentData(dataPaginate)
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
 * paginate route
 */
Department.paginateDepartmentReferencessNull = async function paginateDepartmentReferencessNull(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    let count = 0;
    DepartmentHelper.loadAllCountDepartmentDataRN()
        .then(data => {
            count = data;

            DepartmentHelper.loadAllDepartmentDataRN(dataPaginate)
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
 * paginate route
 */
Department.paginateAllDepartmentDocument = async function paginateAllDepartmentDocument(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    let count = 0;
    DepartmentHelper.loadAllCountDepartmentData()
        .then(data => {
            count = data;

            DepartmentHelper.loadAllDepartmentDocumentData(dataPaginate)
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
Department.show = async function show(req, res, next) {
    const departmentId = req.params.department;
    const pageRoute = 'department.show';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        departmentId
    });

    // DepartmentHelper.loadDepartmentData(departmentId)
    //     .then(data => {
    //         const result = {
    //             success: true,
    //             data: data
    //         };

    //         res.render(PugView.getView(pageRoute), {
    //             req,
    //             pageRoute,
    //             result
    //         });
    //     })
    //     .catch(err => console.error(err));
};
/**
 * load user
 */
Department.userData = async function userData(req, res, next) {
    const departmentId = req.params.group;

    DepartmentHelper.loadDepartmentUserData(departmentId)
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
 * load data with id
 */
Department.loadData = async function loadData(req, res, next) {
    const departmentId = req.params.department;

    DepartmentHelper.loadDepartmentData(departmentId)

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
 * edit page route
 */
Department.edit = async function edit(req, res, next) {
    const pageRoute = 'department.edit';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
Department.editDepartmentData = async function editDepartmentData(req, res, next) {
    const title = req.params.departmentData;

    DepartmentHelper.loadDepartmentData(title)
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
 * return references data
 */
Department.References = async function References(req, res, next) {
    const references = req.params.references;

    DepartmentHelper.loadReferencesData(references)
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
Department.update = async function update(req, res, next) {
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

    let departmentRes = await DepartmentHelper.loadDepartmentData(req.body._id);
    const departmentLFiles = (departmentRes || {}).files || [];

    for (let index = 0; index < departmentLFiles.length; index++) {
        const element = departmentLFiles[index];
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
        "department_category_id": req.body.department_category_id,
        "references": req.body.references,
        "oldReferences": req.body.oldReferences,
        "description": req.body.description || '',
        "files": fileList
    };

    DepartmentHelper.updateDepartmentData(data)
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
Department.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    DepartmentHelper.deleteDepartmentData(data)
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
Department.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('department.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data dep cat
 */
Department.store = async function store(req, res, next) {

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
        "is_active": req.body.is_active || false,
        "department_category_id": req.body.department_category_id,
        "references": req.body.references || null,
        "description": req.body.description,
        "files": fileList || []
    };

    DepartmentHelper.insertNewDepartment(data)
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