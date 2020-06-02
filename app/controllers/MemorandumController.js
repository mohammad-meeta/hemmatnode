'use strict';
const PugView = use('app/helpers/pug-view');
const MemorandumHelper = use('app/helpers/invite-session-helper');
const FileHelper = use('app/helpers/file-helper');
const SMSSender = use('app/helpers/sms-sender-helper')
/**
 * Dep cat controller
 */
function Memorandum() {}
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

            MemorandumHelper.loadAllMemorandumData(dataPaginate, group)
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
    const title = req.params.sessionData;

    MemorandumHelper.loadMemorandumData(title)
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
        "body": req.body.body,
        "agenda": req.body.agenda,
        "place": req.body.place,
        "date": req.body.date,
        "user_list": req.body.user_list,
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
        "body": req.body.body,
        "agenda": req.body.agenda,
        "place": req.body.place,
        "date": req.body.date,
        "user_list": req.body.user_list,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.department_id,
        "files": fileList
    };

    MemorandumHelper.insertNewMemorandum(data)
        .then(dataRes => {
            SMSSender.sendSms(data);
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
