"use strict";
const PugView = use("app/helpers/pug-view");
const BlogtypeHelper = use("app/helpers/blogtype-helper");
const FileHelper = use("app/helpers/file-helper");
/**
 * Dep cat controller
 */
function Blogtype() { }
module.exports = Blogtype;

/**
 * Blogtype route
 */
Blogtype.index = async function index(req, res, next) {
    const pageRoute = "blogtype.index";

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
    });
};
/**
 * paginate route
 */
Blogtype.paginateBlogtype = async function paginateBlogtype(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10,
    };
    const type = req.params.type;

    try {
        let result = {};

        let data = await BlogtypeHelper.loadAllBlogtypeCountData(type);
        let count = data.data;

        data = await BlogtypeHelper.loadAllBlogtypeData(req, dataPaginate, type);
        result = {
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
 * paginate all route
 */
Blogtype.paginateBlogtypeAll = async function paginateBlogtypeAll(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10,
    };

    try {
        let result = {};

        let data = await BlogtypeHelper.loadAllBlogtypeCountDataAll();
        let count = data.data;

        data = await BlogtypeHelper.loadAllBlogtypeDataAll(req, dataPaginate);
        result = {
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
 * load data with id
 */
Blogtype.show = async function show(req, res, next) {
    const Id = req.params.index;

    BlogtypeHelper.loadBlogtypeData(Id)

        .then((data) => {
            const result = {
                success: true,
                data: {
                    data: data,
                },
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch((err) => console.error(err));
};

/**
 * delete data dep cat
 */
Blogtype.destroy = async function destroy(req, res, next) {
    const data = {
        _id: req.body._id,
    };

    BlogtypeHelper.deleteBlogtypeData(data)
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
 * Create route return page
 */
Blogtype.create = async function create(req, res, next) {
    const pageRoute = PugView.getView("blogtype.create");

    res.render(pageRoute, {
        req,
        pageRoute,
    });
};

/**
 * store data
 */
Blogtype.store = async function store(req, res, next) {
    const data = {
        title: req.body.title,
        user_id: req.session.auth.userId,
        is_active: req.body.is_active,
    };

    BlogtypeHelper.insertNewBlogtype(data)
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
};

/**
 * update data
 */
Blogtype.update = async function update(req, res, next) {
    let data = {};

    data = {
        _id: req.body._id,
        title: req.body.title,
        user_id: req.session.auth.userId,
        is_active: req.body.is_active,
    };
    let result = await BlogtypeHelper.updateBlogtypeData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
