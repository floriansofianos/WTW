var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var userService = require('../helpers/userService')();
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var userController = require('../controllers/userController')(userService);
var movieQuestionnaireController = require('../controllers/movieQuestionnaireController')(movieQuestionnaireService);
var formidable = require('formidable');
var path = require('path');
var Jimp = require("jimp");

var userRoutes = function () {
    var userRouter = express.Router();

    userRouter.route('/')
        .get(isAuthenticated, userController.search);

    userRouter.route('/usersThatLiked')
        .get(isAuthenticated, movieQuestionnaireController.getUsersThatAlsoLiked);

    userRouter.route('/avatar')
        .post(isAuthenticated, function (req, res) {
            // create an incoming form object
            var form = new formidable.IncomingForm();
            // store all uploads in the /uploads directory
            var appDir = path.dirname(require.main.filename);
            form.uploadDir = path.join(appDir, '/uploads');

            var output = path.join(appDir, '/avatars', '/' + req.user.id, "/profile-small.jpg");

            // every time a file has been uploaded successfully,
            // rename it to it's orignal name
            form.on('file', function (field, file) {
                Jimp.read(file.path).then(function (img) {
                    img.resize(256, 256)            // resize
                        .quality(60)                 // set JPEG quality
                        .write(output); // save
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

        });


    userRouter.route('/distance/:userId')
        .get(isAuthenticated, userController.getUserDistance);

    userRouter.route('/:userId')
        .get(isAuthenticated, userController.getUserProfile);

    return userRouter;
}

module.exports = userRoutes;