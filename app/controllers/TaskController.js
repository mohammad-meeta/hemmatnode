'use strict';
const PugView = use('app/helpers/pug-view');
const TaskHelper = use('app/helpers/task-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * task cat controller
 */
function Task() {}
module.exports = Task;

/**
 * Index route
 */
Task.index = async function index(req, res, next) {
    const pageRoute = 'task.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * paginate route
 */
Task.paginateTask = async function paginateTask(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    TaskHelper.loadAllTaskCountData()
        .then(data => {
            let count = data.data;

            TaskHelper.loadAllTaskData(dataPaginate)
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
Task.show = async function show(req, res, next) {
    const TaskTitle = req.params.taskData;
    const pageRoute = 'task.show';
    TaskHelper.loadTaskData(TaskTitle)
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
Task.edit = async function edit(req, res, next) {
    const pageRoute = 'task.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
Task.editTaskData = async function editTaskData(req, res, next) {
    const title = req.params.taskData;

    TaskHelper.loadTaskData(title)
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
 * update data task cat
 */
Task.update = async function update(req, res, next) {
    let data = {};
    const files = req.body.files || [];

    let fileList = [];
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
        "execution_rank": req.body.execution_rank,
        "weight": req.body.weight,
        "parent": req.body.parent || null,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "description": req.body.description || '',
        "files": fileList,
        "regulation": req.body.regulation || []
    };

    TaskHelper.updateTaskData(data)
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
 * delete data task cat
 */
Task.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    TaskHelper.deleteTaskData(data)
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
Task.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('task.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data task cat
 */
Task.store = async function store(req, res, next) {

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
        "execution_rank": req.body.execution_rank,
        "weight": req.body.weight,
        "parent": req.body.parent || null,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "description": req.body.description || '',
        "files": fileList,
        "regulation": req.body.regulation || []
    };


    TaskHelper.insertNewTask(data)
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