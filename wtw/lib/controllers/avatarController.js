var formidable = require('formidable');
var path = require('path');
var Jimp = require("jimp");
var fs = require('fs');
var _ = require('underscore');

var avatarController = function () {
    var create = function (req, res) {
        // create an incoming form object
        var form = new formidable.IncomingForm();
        // store all uploads in the /uploads directory
        var appDir = path.dirname(require.main.filename);
        form.uploadDir = path.join(appDir, '/uploads');

        var outputBig = path.join(appDir, '/avatars', '/' + req.user.id, "/profile-big.jpg");
        var outputSmall = path.join(appDir, '/avatars', '/' + req.user.id, "/profile-small.jpg");

        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        form.on('file', function (field, file) {
            Jimp.read(file.path).then(function (img) {
                // Check the ratio of the image
                var w = img.bitmap.width; // the width of the image
                var h = img.bitmap.height; // the height of the image
                // If we have a panorama, crop it
                if (w > h) {
                    var cropValue = (w - ((3 * h) / 4)) / 2;
                    img.crop(cropValue, 0, w - (2 * cropValue), h);
                }
                // Big avatar
                img.scaleToFit(600, 800)           // resize
                    .quality(90)                 // set JPEG quality
                    .write(outputBig); // save
                // Small avatar
                img.scaleToFit(150, 200)           // resize
                    .quality(70)                 // set JPEG quality
                    .write(outputSmall); // save
            }).catch(function (err) {
                throw new Error(err);
            });
        });

        // log any errors that occur
        form.on('error', function (err) {
            throw new Error('An error has occured: \n' + err);
        });

        // once all the files have been uploaded, send a response to the client
        form.on('end', function () {
            res.end('success');
        });

        // parse the incoming request containing the form data
        form.parse(req);
    }

    var get = function (req, res) {
        if (req.params.userId) {
            var appDir = path.dirname(require.main.filename);
            var fileName = req.params.size == 'small' ? "/profile-small.jpg" : "/profile-big.jpg";
            var filePath = path.join(appDir, '/avatars', '/' + req.params.userId, fileName);
            Jimp.read(filePath).then(function (img) {
                img.getBase64('image/jpeg', function (err, data) {
                    if (err) {
                        res.sendStatus(500);
                        throw new Error(err);
                    }
                    res.send({ success: true, data: data });
                });
            }).catch(function (err) {
                // The file probably does not exist
                res.send({ success: false });
            });
        }
        else return res.send(400);
    }

    var deleteAvatar = function (req, res) {
        var appDir = path.dirname(require.main.filename);
        var fileNames = ["/profile-small.jpg", "/profile-big.jpg"];
        // delete small picture
        deleteFile(path.join(appDir, '/avatars', '/' + req.user.id, fileNames[0]), function (err, result) {
            if (err) {
                res.sendStatus(500);
                throw new Error(err);
            }
            // delete big picture
            deleteFile(path.join(appDir, '/avatars', '/' + req.user.id, fileNames[1]), function (err, result) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                res.send({ success: true });
            });
        });
    }

    var deleteFile = function (path, done) {
        fs.stat(path, function (err, stat) {
            if (err == null) {
                // delete file
                fs.unlinkSync(path);
                done(null, true);
            } else if (err.code == 'ENOENT') {
                // file does not exist
                done(null, true);
            } else {
                throw new Error(err);
                done(null, true);
            }
        });
    }

    return {
        create: create,
        get: get,
        deleteAvatar: deleteAvatar
    }
}

module.exports = avatarController;