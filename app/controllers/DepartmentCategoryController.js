'use strict';
const PugView = use('app/helpers/pug-view');
const DepCatHelper = use('app/helpers/department-category-helper');
/**
 * Dep cat controller
 */
function DepartmentCategory() {}
module.exports = DepartmentCategory;

/**
 * Index route
 */
DepartmentCategory.index = async function index(req, res, next) {
    const pageRoute = 'departmentcategory.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};
/**
 * paginate route
 */
DepartmentCategory.paginateDepartmentCategory = async function paginateDepartmentCategory(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    DepCatHelper.loadAllCountDepCatData()
        .then(data => {
            let count = data.data;

            DepCatHelper.loadAllDepCatData(dataPaginate)
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
 * departmentCategory And Department route
 */
DepartmentCategory.departmentCategoryAndDepartment = async function departmentCategoryAndDepartment(req, res, next) {
    const section = req.params.section;

    DepCatHelper.loadAllDepCatDataAndDepartment(section)
        .then(data => {
            const result = {
                success: true,
                data: {
                    data: data
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
};
/**
 * departmentCategory And Department route
 */
DepartmentCategory.departmentData = async function departmentData(req, res, next) {
    const category = req.params.department_category;

    DepCatHelper.loadAllDepartmentData(category)
        .then(data => {
            const result = {
                success: true,
                data: {
                    data: data
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
};

/**
 * show route
 */
DepartmentCategory.show = async function show(req, res, next) {
    const depCatTitle = req.params.depCatData;
    const pageRoute = 'departmentcategory.show';
    DepCatHelper.loadDepCatData(depCatTitle)
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
DepartmentCategory.edit = async function edit(req, res, next) {
    const pageRoute = 'departmentcategory.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
DepartmentCategory.editdepCatData = async function editdepCatData(req, res, next) {
    const title = req.params.depCatData;

    DepCatHelper.loadDepCatData(title)
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
DepartmentCategory.update = async function update(req, res, next) {
    let data = {};
    data = {
        "title": req.body.title,
        "section_id": req.body.section_id,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active
    };
    const UserUpdate = DepCatHelper.updateUserData(data)
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
DepartmentCategory.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    const UserDelete = DepCatHelper.deleteDepCatData(data)
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
DepartmentCategory.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('departmentcategory.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data dep cat
 */
DepartmentCategory.store = async function store(req, res, next) {

    const data = {
        "section_id": req.body.section_id,
        "title": req.body.title,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active || false
    };

    DepCatHelper.insertNewDepCat(data)
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