'use strict';
const PugView = use('app/helpers/pug-view');
const ArticleTypeHelper = use('app/helpers/article-type-helper');
/**
 * Auth controller
 */
function ArticleTypeController() { }
module.exports = ArticleTypeController;

/**
 * Index route
 */
ArticleTypeController.index = async function index(req, res, next) {
    const pageRoute = 'articletype.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};
/**
 * paginate route
 */
ArticleTypeController.paginateArticleTypeData = async function paginateArticleTypeData(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    ArticleTypeHelper.loadAllArticleTypeData(dataPaginate)
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
 * show route
 */
ArticleTypeController.show = async function show(req, res, next) {
    const ArticleTypeName = req.params.articleTypeData;
    const pageRoute = 'articletype.show';
    ArticleTypeHelper.loadArticleTypeData(ArticleTypeName)
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
ArticleTypeController.edit = async function edit(req, res, next) {
    const pageRoute = 'articletype.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
ArticleTypeController.editArticleTypeData = async function editArticleTypeData(req, res, next) {
    const ArticleTypeName = req.params.articleTypeData;
    ArticleTypeHelper.loadArticleTypeData(ArticleTypeName)
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
 * update data ArticleType
 */
ArticleTypeController.update = async function update(req, res, next) {
    const data = {
        "_id": req.body._id,
        "user_id": req.body.user_id,
        "title": req.body.title,
        "is_active": req.body.is_active
    };

    const ArticleTypeUpdate = ArticleTypeHelper.updateArticleTypeData(data)
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
 * delete data ArticleType
 */
ArticleTypeController.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    const ArticleTypeDelete = ArticleTypeHelper.deleteArticleTypeData(data)
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
ArticleTypeController.create = async function create(req, res, next) {
    const pageRoute = 'articletype.create';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * store data ArticleType
 */
ArticleTypeController.store = async function store(req, res, next) {

    const data = {
        "user_id": req.body.user_id,
        "title": req.body.title,
        "is_active": req.body.is_active || false
    };

    const ArticleTypeInsert = ArticleTypeHelper.insertNewArticleType(data)
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
