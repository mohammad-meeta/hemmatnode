"use strict";

const { Console } = require("winston/lib/winston/transports");

const PugView = use("app/helpers/pug-view");
const InviteSessionHelper = use("app/helpers/invite-session-helper");
const FileHelper = use("app/helpers/file-helper");
const SMSSender = use("app/helpers/sms-sender-helper");
/**
 * Dep cat controller
 */
function InviteSession() { }
module.exports = InviteSession;

/**
 * Index route
 */
InviteSession.index = async function index(req, res, next) {
    const pageRoute = "invitesession.index";

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        departmentId: req.params.department,
    });
};
/**
 * paginate route
 */
InviteSession.paginateInviteSession = async function paginateInviteSession(
    req,
    res,
    next
) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10,
    };
    const group = req.params.group;

    try {
        let data = await InviteSessionHelper.loadAllInviteSessionCountData(
            req,
            group
        );
        let count = data.data;

        data = await InviteSessionHelper.loadAllInviteSessionData(
            req,
            dataPaginate,
            group
        );

        const result = {
            success: true,
            data: {
                data: data,
                count: count,
            },
        };

        res.status(200)
            .send(result)
            .end();
    } catch (err) {
        Logger.error(err);

        res.status(500)
            .send(err)
            .end();
    }
};

/**
 * show route
 */
InviteSession.show = async function show(req, res, next) {
    const SessionTitle = req.params.sessionData;
    const pageRoute = "invitesession.show";
    InviteSessionHelper.loadInviteSessionData(SessionTitle)
        .then((data) => {
            const result = {
                success: true,
                data: data,
            };
            res.render(PugView.getView(pageRoute), {
                req,
                pageRoute,
                result,
            });
        })
        .catch((err) => console.error(err));
};

/**
 * edit page route
 */
InviteSession.edit = async function edit(req, res, next) {
    const pageRoute = "invitesession.edit";
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
    });
};

/**
 * return edit data route
 */
InviteSession.editInviteSessionData = async function editInviteSessionData(
    req,
    res,
    next
) {
    const title = req.params.sessionData;

    InviteSessionHelper.loadInviteSessionData(title)
        .then((data) => {
            const result = {
                success: true,
                data: data,
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch((err) => console.error(err));
};

/**
 * update data dep cat
 */
InviteSession.update = async function update(req, res, next) {
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

    const deletedOldFiles = JSON.parse(req.body.deletedOldFiles);
    let oldFiles = JSON.parse(req.body.oldFiles);

    console.log(deletedOldFiles)
    console.log("***********************************************")
    console.log(oldFiles)
    console.log("***********************************************")

    for (let index = 0; index < deletedOldFiles.length; index++) {
        const index = oldFiles.indexOf(deletedOldFiles[index]);
        if (index > -1) {
            oldFiles.splice(index, 1);
        }
    }

    for (let index = 0; index < oldFiles.length; index++) {
        const element = oldFiles[index];

        const tempFileData = {
            file_id: element._id,
            deleted_at: null,
        };
        fileList.push(tempFileData);

    }
    console.log("***********************************************")

    data = {
        _id: req.body._id,
        body: req.body.body,
        agenda: JSON.parse(req.body.agenda || "[]"),
        place: req.body.place,
        date: req.body.date,
        user_list: JSON.parse(req.body.user_list),
        other_user: JSON.parse(req.body.other_user || "[]"),
        user_id: req.session.auth.userId,
        is_active: req.body.is_active,
        department_id: req.body.department_id,
        files: fileList,
    };
    console.log(JSON.stringify(data, null, 2));
    let result = await InviteSessionHelper.updateInviteSessionData(data);
    result = {
        success: true,
        data: data,
    };

    res.status(200)
        .send(result)
        .end();
};

/**
 * delete data dep cat
 */
InviteSession.destroy = async function destroy(req, res, next) {
    let data = {
        _id: req.body._id,
    };

    data = await InviteSessionHelper.deleteInviteSessionData(data);
    const result = {
        success: true,
        data: data,
    };

    res.status(200)
        .send(result)
        .end();
};

/**
 * Create route return page
 */
InviteSession.create = async function create(req, res, next) {
    const pageRoute = PugView.getView("invitesession.create");

    res.render(pageRoute, {
        req,
        pageRoute,
    });
};

/**
 * store data dep cat
 */
InviteSession.store = async function store(req, res, next) {
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
        body: req.body.body,
        agenda: JSON.parse(req.body.agenda || "[]"),
        place: req.body.place,
        date: req.body.date,
        user_list: JSON.parse(req.body.user_list),
        other_user: JSON.parse(req.body.other_user || "[]"),
        user_id: req.session.auth.userId,
        is_active: req.body.is_active,
        department_id: req.body.department_id,
        status: 0,
        files: fileList,
    };

    try {
        let dataRes = await InviteSessionHelper.insertNewInviteSession(data);
        SMSSender.sendSms(data);

        const result = {
            success: true,
            data: dataRes,
        };

        res.status(200)
            .send(result)
            .end();
    } catch (err) {
        console.error(err);

        res.status(500)
            .send({
                success: false,
                data: "Server error",
            })
            .end();
    }
};
/**
 * store approves session
 */
InviteSession.approvesStore = async function approvesStore(req, res, next) {
    const approves = JSON.parse(req.body.approves);
    let approvesArray = [];

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

    InviteSessionHelper.insertApproves(approves)
        .then((dataRes) => {
            for (let index = 0; index < dataRes.length; index++) {
                approvesArray.push(dataRes[index]["_id"]);
            }

            const data = {
                _id: req.body._id,
                introduction: req.body.introduction,
                user_list_present: req.body.user_list_present,
                other_user: req.body.other_user,
                user_id: req.session.auth.userId,
                status: req.body.status || 1,
                approves: approves,
                signatured: fileList,
            };

            InviteSessionHelper.updateInviteSessionApproves(data)
                .then((dataRes) => {
                    const result = {
                        success: true,
                        data: dataRes,
                    };
                    res.status(200)
                        .send(result)
                        .end();
                })
                .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
};
