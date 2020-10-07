
'use strict';

const mongoose = require('mongoose');

/**
 * Blogtype controller
 */
function BlogTypeHelper() { }
module.exports = BlogTypeHelper;

/**
 * find all dep cat data blogtype
 */
BlogTypeHelper.loadAllBlogtypeDataAll = async function loadAllBlogtypeDataAll(req, dataPaginate) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Blogtype = mongoose.model("Blogtype");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
            }
        },
        {
            $sort: {
                created_at: -1
            }
        },
        {
            $skip: skip
        },
        {
            $limit: pageSize
        }
    ];
    let res = await Blogtype.aggregate(pipeline);

    return res;
};
/**
 * find all dep cat count data result
 */
BlogTypeHelper.loadAllBlogtypeCountDataAll = function loadAllBlogtypeCountDataAll() {
    const Blogtype = mongoose.model('Blogtype');

    const filterQuery = {
    };

    return new Promise((resolve, reject) => {
        Blogtype.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find Blogtype data result
 */
BlogTypeHelper.loadBlogtypeData = function loadBlogtypeData(id) {
    const Blogtype = mongoose.model('Blogtype');

    const filterQuery = {
        _id: id
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Blogtype.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Blogtype data
 */
BlogTypeHelper.insertNewBlogtype = async function insertNewBlogtype(data) {
    const Blogtype = mongoose.model('Blogtype');
    const blogtype = new Blogtype(data)

    let res2 = await blogtype.save();
    const pipeline = [
        {
            $match: {
                _id: res2._id,
            }
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];
    let res = await Blogtype.aggregate(pipeline);
    return res;
};

/**
 * update Blogtype data
 */
BlogTypeHelper.updateBlogtypeData = async function updateBlogtypeData(data) {
    const Blogtype = mongoose.model('Blogtype');
    let res2 = await Blogtype.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

    const pipeline = [
        {
            $match: {
                _id: res2._id,
            }
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];
    let res = await Blogtype.aggregate(pipeline);
    return res;
};

/**
 * delete blogtype data
 */
BlogTypeHelper.deleteBlogtype = function deleteBlogtype(data) {
    return new Promise((resolve, reject) => {
        const Blogtype = mongoose.model('Blogtype');
        Blogtype.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false, new: true })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

