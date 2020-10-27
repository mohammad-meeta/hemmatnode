"use strict";

const FS = require("fs");
const PugView = use("app/helpers/pug-view");
const FileHelper = use('app/helpers/file-helper');

/**
 * Controller
 */
function Controller() { }
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
    let imgUrl = route("storage.get_image", { name: filename });

    res.send({
        default: imgUrl,
    });
};
/**
 * file url
 */
Controller.file = async function file(req, res, next) {
    let fileId = req.params.image;

    try {
        const data = await FileHelper.findFile(fileId);
        const filename = rPath("storage/uploads", data.filename);

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
    }
    catch (err) {
        console.error(err);
    }
};
