'use strict';
const PugView = use('app/helpers/pug-view');
const ArticleHelper = use('app/helpers/article-helper');
/**
 * Auth controller
 */
function ArticleController() { }
module.exports = ArticleController;

/**
 * Index route
 */
ArticleController.index = async function index(req, res, next) {
    const pageRoute = 'article.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};
/**
 * paginate route
 */
ArticleController.paginateArticleData = async function paginateArticleData(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    ArticleHelper.loadAllArticleData(dataPaginate)
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
ArticleController.show = async function show(req, res, next) {
    const ArticleName = req.params.articleData;
    const pageRoute = 'article.show';
    ArticleHelper.loadArticleData(ArticleName)
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
ArticleController.edit = async function edit(req, res, next) {
    const pageRoute = 'article.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
ArticleController.editArticleData = async function editArticleData(req, res, next) {
    const ArticleId = req.params.articleData;
    ArticleHelper.loadArticleData(ArticleId)
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
 * update data Article
 */
ArticleController.update = async function update(req, res, next) {

    const data = {
        "_id": req.body._id,
        "title": req.body.title,
        "body": req.body.body,
        "user": req.body.user,
        "type": req.body.type,
        "slug": req.body.slug,
        "files": req.body.files || [],
        "is_active": req.body.is_active || false
    };
    console.log(data)
    const ArticleUpdate = ArticleHelper.updateArticleData(data)
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
 * delete data Article
 */
ArticleController.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    const ArticleDelete = ArticleHelper.deleteArticle(data)
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
ArticleController.create = async function create(req, res, next) {
    const pageRoute = 'article.create';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * store data Article
 */
ArticleController.store = async function store(req, res, next) {

    const data = {
        "title": req.body.title,
        "body": req.body.body,
        "user": req.body.user,
        "type": req.body.type,
        "slug": req.body.slug,
        "files": req.body.files || [],
        "is_active": req.body.is_active || false
    };

    const ArticleInsert = ArticleHelper.insertNewArticle(data)
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
