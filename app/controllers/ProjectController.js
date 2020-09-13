'use strict';
const PugView = use('app/helpers/pug-view');
const ProjectHelper = use('app/helpers/project-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * project cat controller
 */
function Project() { }
module.exports = Project;

/**
 * Index route
 */
Project.index = async function index(req, res, next) {
    const pageRoute = 'project.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        departmentId: req.params.department,
        type: req.params.type
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
    const group = req.params.group;
    const type = req.params.type;

    ProjectHelper.loadAllCountProjectData(group, type)
        .then(data => {
            let count = data.data;

            ProjectHelper.loadAllProjectData(req, dataPaginate, group, type)
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
    const id = req.params.projectData;
    const pageRoute = 'project.show';
    ProjectHelper.loadProjectData(id)
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

    let projectRes = await ProjectHelper.loadProjectData(req.body._id);
    const projectFiles = (projectRes || {}).files || [];

    for (let index = 0; index < projectFiles.length; index++) {
        const element = projectFiles[index];
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
        "program_id": req.body.program_id || null,
        "target": req.body.target || '',
        "same_effects_index": req.body.same_effects_index || '',
        "organ_moderator": req.body.organ_moderator,
        "project_moderator": req.body.project_moderator || '',
        "consoultant": req.body.consoultant || '',
        "supervisor": req.body.supervisor || '',
        "committee_leadership": req.body.committee_leadership || '',
        "coworker": req.body.coworker || '',
        "description": req.body.description || '',
        "intervention_review": req.body.intervention_review || '',
        "pervious_action_relation": req.body.pervious_action_relation || '',
        "target_corresponding": req.body.target_corresponding || '',
        "help_ipmrove_index": req.body.help_ipmrove_index || '',
        "other_benefit": req.body.other_benefit || '',
        "final_product": req.body.final_product || '',
        "standards": req.body.standards || '',
        "result_apply": req.body.result_apply || '',
        "refree": req.body.refree || '',
        "monitoring_comment": req.body.monitoring_comment || '',
        "files": fileList,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
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
        pageRoute,
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
        "program_id": req.body.program_id || null,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "target": req.body.target || '',
        "same_effects_index": req.body.same_effects_index || '',
        "organ_moderator": req.body.organ_moderator,
        "project_moderator": req.body.project_moderator || '',
        "consoultant": req.body.consoultant || '',
        "supervisor": req.body.supervisor || '',
        "committee_leadership": req.body.committee_leadership || '',
        "coworker": req.body.coworker || '',
        "description": req.body.description || '',
        "intervention_review": req.body.intervention_review || '',
        "pervious_action_relation": req.body.pervious_action_relation || '',
        "target_corresponding": req.body.target_corresponding || '',
        "help_ipmrove_index": req.body.help_ipmrove_index || '',
        "final_product": req.body.final_product || '',
        "standards": req.body.standards || '',
        "other_benefit": req.body.other_benefit || '',
        "result_apply": req.body.result_apply || '',
        "refree": req.body.refree || '',
        "monitoring_comment": req.body.monitoring_comment || '',
        "files": fileList
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
