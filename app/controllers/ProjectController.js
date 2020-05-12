'use strict';
const PugView = use('app/helpers/pug-view');
const ProjectHelper = use('app/helpers/project-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * project cat controller
 */
function Project() {}
module.exports = Project;

/**
 * Index route
 */
Project.index = async function index(req, res, next) {
    const pageRoute = 'project.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * paginate route
 */
Project.paginateProject = async function paginateProject(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    ProjectHelper.loadAllProjectCountData()
        .then(data => {
            let count = data.data;

            ProjectHelper.loadAllProjectData(dataPaginate)
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
Project.show = async function show(req, res, next) {
    const ProjectTitle = req.params.projectData;
    const pageRoute = 'project.show';
    ProjectHelper.loadProjectData(ProjectTitle)
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
Project.edit = async function edit(req, res, next) {
    const pageRoute = 'project.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
Project.editProjectData = async function editProjectData(req, res, next) {
    const title = req.params.projectData;

    ProjectHelper.loadProjectData(title)
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
 * update data project cat
 */
Project.update = async function update(req, res, next) {
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
        "weight": req.body.weight,
        "parent": req.body.parent || null,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "description": req.body.description || '',
        "files": fileList,
        "regulation": req.body.regulation || []
    };

    ProjectHelper.updateProjectData(data)
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
 * delete data project cat
 */
Project.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    ProjectHelper.deleteProjectData(data)
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
Project.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('project.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data project cat
 */
Project.store = async function store(req, res, next) {

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
        "weight": req.body.weight,
        "parent": req.body.parent || null,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "description": req.body.description || '',
        "files": fileList,
        "regulation": req.body.regulation || []
    };


    ProjectHelper.insertNewProject(data)
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