var formidable = require('formidable');
var path = require('path');
var Jimp = require("jimp");

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
                console.error(err);
            });
        });

        // log any errors that occur
        form.on('error', function (err) {
            console.log('An error has occured: \n' + err);
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
                    res.send({ success: true, data: data });
                });
            }).catch(function (err) {
                // The file probably does not exist
                res.send({ success: false });
            });
        }
        else return res.send(400);
    }

    return {
        create: create,
        get: get
    }
}

module.exports = avatarController;