'use strict';
const PugView = use('app/helpers/pug-view');
const DepartmentHelper = use('app/helpers/department-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Department() {}
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
 * show route
 */
Department.show = async function show(req, res, next) {
    const DepartmentTitle = req.params.departmentData;
    const pageRoute = 'department.show';
    DepartmentHelper.loadDepartmentData(DepartmentTitle)
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
 * update data dep cat
 */
Department.update = async function update(req, res, next) {
    let data = {};
    const files = req.body.files || [];

    fileList = [];
    files.forEach(element => {
        const fileData = element;
        FileHelper.insertFileData(fileData)
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));
    });

    data = {
        "_id": req.body._id,
        "title": req.body.title,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_category_id": req.body.department_category_id,
        "description": req.body.description || '',
        "files": fileList,
        "regulation": req.body.regulation || []
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
            fileList.push(data[0]._id);
        } catch (err) {
            Logger.error(err);
        }
    }

    const data = {
        "title": req.body.title,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active || false,
        "department_category_id": req.body.department_category_id,
        "description": req.body.description || '',
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