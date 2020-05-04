'use strict';
const PugView = use('app/helpers/pug-view');
const DepartmentRegulationHelper = use('app/helpers/department-regulation-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function DepartmentRegulation() {}
module.exports = DepartmentRegulation;

/**
 * Index route
 */
DepartmentRegulation.index = async function index(req, res, next) {
    const pageRoute = 'department.regulation.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};
/**
 * paginate route
 */
DepartmentRegulation.paginateDepartmentRegulation = async function paginateDepartmentRegulation(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    let count = 0;
    DepartmentRegulationHelper.loadAllCountDepartmentRegulationData()
        .then(data => {
            count = data;

            DepartmentRegulationHelper.loadAllDepartmentRegulationData(dataPaginate)
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
DepartmentRegulation.show = async function show(req, res, next) {
    const DepartmentTitle = req.params.departmentData;
    const pageRoute = 'department.regulation.show';
    DepartmentRegulationHelper.loadDepartmentRegulationData(DepartmentTitle)
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
DepartmentRegulation.edit = async function edit(req, res, next) {
    const pageRoute = 'department.regulation.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
DepartmentRegulation.editDepartmentRegulationData = async function editDepartmentRegulationData(req, res, next) {
    const title = req.params.departmentData;

    DepartmentRegulationHelper.loadDepartmentRegulationData(title)
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
DepartmentRegulation.update = async function update(req, res, next) {
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
};

/**
 * delete data dep cat
 */
DepartmentRegulation.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    const UserDelete = DepartmentRegulationHelper.deleteDepartmentRegulationData(data)
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
DepartmentRegulation.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('department.regulation.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data dep cat
 */
DepartmentRegulation.store = async function store(req, res, next) {

    const files = req.files || [];

    let fileList = [];

    for (let i = 0; i < files.length; ++i) {
        try {
            const el = files[i];
            el.user_id = /*req.session.auth.userId*/ "5e91e959db925c5aff835a11";

            const data = await FileHelper.insertFileData(el);

            const temp = {
                "file_id": data[0]._id,
                "deleted_at": null
            };
            fileList.push(temp);
        } catch (err) {
            Logger.error(err);
        }
    }

    const data = {
        "title": req.body.title,
        "user_id": /*req.session.auth.userId*/ "5e91e959db925c5aff835a11",
        "is_active": req.body.is_active || false,
        "department_id": req.body.department_id,
        "description": req.body.description || '',
        "files": fileList || []
    };

    DepartmentRegulationHelper.insertNewDepartmentRegulation(data)
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