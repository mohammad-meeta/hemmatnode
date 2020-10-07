'use strict';
const PugView = use('app/helpers/pug-view');
const BlogHelper = use('app/helpers/blog-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Blog() { }
module.exports = Blog;

/**
 * Index route
 */
Blog.index = async function index(req, res, next) {
    const pageRoute = 'blog.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
    });
};
/**
 * paginate route
 */
Blog.paginateBlog = async function paginateBlog(req, res, next) {

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await BlogHelper.loadAllBlogCountData();
        let count = data.data;

        data = await BlogHelper.loadAllBlogData(req, dataPaginate);
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
 * load data with id
 */
Blog.show = async function show(req, res, next) {
    const Id = req.params.blog;

    BlogHelper.loadBlogData(Id)

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
Blog.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    BlogHelper.deleteBlogData(data)
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
Blog.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('blog.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
Blog.store = async function store(req, res, next) {
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
        "blogtype": req.body.blogtype,
        "date": req.body.date,
        "description": req.body.description,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "files": fileList,
    };

    BlogHelper.insertNewBlog(data)
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
Blog.update = async function update(req, res, next) {
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

    let blogRes = await BlogHelper.loadBlogData(req.body._id);
    const blogLFiles = (blogRes || {}).files || [];

    for (let index = 0; index < blogLFiles.length; index++) {
        const element = blogLFiles[index];
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
        "blogtype": req.body.blogtype,
        "description": req.body.description,
        "date": req.body.date,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "files": fileList,
    };

    let result = await BlogHelper.updateBlogData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
