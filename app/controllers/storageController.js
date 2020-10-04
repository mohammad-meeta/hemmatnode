"use strict";

const FS = require("fs");

/**
 * Controller
 */
function Controller() {}
module.exports = Controller;

/**
 * Get Image
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next Callback
 */
Controller.getImage = async function getImage(req, res, next) {
    const filename = rPath("storage/uploads", req.params.name);

    try {
        if (FS.existsSync(filename)) {
            res.sendFile(filename);
        } else {
            res.status(404)
                .send({
                    success: false,
                    data: "Invalid Filename",
                })
                .end();
        }
    } catch (err) {
        console.error(err);
        res.status(404)
            .send({
                success: false,
                data: "Server error!",
            })
            .end();
    }
};

/**
 * Get Upload Token
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next Callback
 */
Controller.uploadToken = async function uploadToken(req, res, next) {
    res.status(200)
        .send(req.cookies["_csrf"] || "__token")
        .end();
};

/**
 * Upload image
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next Callback
 */
Controller.uploadImage = async function uploadImage(req, res, next) {
    let filename = req.file.filename;
    let imgUrl = Router.routePath("storage.get_image", {
        name: filename,
    });

    res.send({
        default: imgUrl,
    });
};
