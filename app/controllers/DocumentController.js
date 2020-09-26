'use strict';
const PugView = use('app/helpers/pug-view');
const DocumentHelper = use('app/helpers/document-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Document() { }
module.exports = Document;

/**
 * Index route
 */
Document.index = async function index(req, res, next) {
    const pageRoute = 'document.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        departmentId: req.params.department,
        year: req.params.year,
    });
};
/**
 * paginate route
 */
Document.paginateDocument = async function paginateDocument(req, res, next) {
    const group = req.params.group;

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await DocumentHelper.loadAllDocumentCountData(group);
        let count = data.data;

        data = await DocumentHelper.loadAllDocumentData(req, dataPaginate, group);
        result = {
            success: true,
            data: {
                data: data,
                count: count
            }
        };

        res.status(200)
            .send(result)
            .end();

    }
    catch (err) {

        Logger.error(err);

        res.status(500)
            .send(err)
            .end();
    }
};
/**
 * paginate by year route
 */
Document.paginateDocumentYear = async function paginateDocumentYear(req, res, next) {
    const group = req.params.group;
    const year = req.params.year;

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await DocumentHelper.loadAllDocumentCountYearData(group, year);
        let count = data.data;

        data = await DocumentHelper.loadAllDocumentYearData(req, dataPaginate, group, year);
        result = {
            success: true,
            data: {
                data: data,
                count: count
            }
        };

        res.status(200)
            .send(result)
            .end();

    }
    catch (err) {

        Logger.error(err);

        res.status(500)
            .send(err)
            .end();
    }
};
/**
 * group date document
 */
Document.groupDate = async function groupDate(req, res, next) {
    const group = req.params.group;

    const data = await DocumentHelper.loadGroupDate(req, group);
    const result = {
        success: true,
        data: data
    };

    res.status(200)
        .send(result)
        .end();
};

/**
 * show route
 */
/**
 * load data with id
 */
Document.show = async function show(req, res, next) {
    const Id = req.params.document;

    DocumentHelper.loadDocumentData(Id)

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
 * delete data dep cat
 */
Document.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    DocumentHelper.deleteDocumentData(data)
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
Document.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('document.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
Document.store = async function store(req, res, next) {
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
        "body": req.body.executor,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "document_type_id": req.body.document_type_id,
        "department_id": req.body.department_id,
        "files": fileList
    };

    DocumentHelper.insertNewDocument(data)
        .then(dataRes => {
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

/**
 * update data
 */
Document.update = async function update(req, res, next) {
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

    let documentRes = await DocumentHelper.loadDocumentData(req.body._id);
    const documentLFiles = (documentRes || {}).files || [];

    for (let index = 0; index < documentLFiles.length; index++) {
        const element = documentLFiles[index];
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
        "body": req.body.executor,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "document_type_id": req.body.document_type_id,
        "department_id": req.body.department_id,
        "files": fileList
    };

    let result = await DocumentHelper.updateDocumentData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
