var express = require('express');
var testRouter = require('./lib/routes/testRoutes')();
var adminRouter = require('./lib/routes/adminRoutes')();
var authRouter = require('./lib/routes/authRoutes')();
var firstQuestionnaireRouter = require('./lib/routes/firstQuestionnaireRoutes')();
var movieDBConfigurationRouter = require('./lib/routes/movieDBConfigurationRoutes')();
var movieQuestionnaireRouter = require('./lib/routes/movieQuestionnaireRoutes')();
var tvQuestionnaireRouter = require('./lib/routes/tvQuestionnaireRoutes')();
var movieRecommandationRouter = require('./lib/routes/movieRecommandationRoutes')();
var tvRecommandationRouter = require('./lib/routes/tvRecommandationRoutes')();
var userQuestionnaireRouter = require('./lib/routes/userQuestionnaireRoutes')();
var userTVQuestionnaireRouter = require('./lib/routes/userTVQuestionnaireRoutes')();
var movieSearchRouter = require('./lib/routes/movieDBSearchRoutes')();
var movieSearchTVRouter = require('./lib/routes/movieDBSearchTVRoutes')();
var movieDBGenresRouter = require('./lib/routes/movieDBGenresRoutes')();
var movieRouter = require('./lib/routes/movieRoutes')();
var tvshowRouter = require('./lib/routes/tvshowRoutes')();
var userRouter = require('./lib/routes/userRoutes')();
var castRouter = require('./lib/routes/castRoutes')();
var friendRouter = require('./lib/routes/friendRoutes')();
var followRouter = require('./lib/routes/followingRoutes')();
var countriesRouter = require('./lib/routes/countriesRoutes')();
var languagesRouter = require('./lib/routes/languagesRoutes')();
var notificationRouter = require('./lib/routes/notificationRoutes')();
var timelineEventRouter = require('./lib/routes/timelineEventRoutes')();
var cookieParser = require('cookie-parser');
var passport = require('passport');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var clientErrorHandler = require('./lib/middlewares/clientErrorHandler');
var favicon = require('serve-favicon');
var path = require('path');
var movieDbService = require('./lib/helpers/movieDBService')();
var Queue = require('bull');
var wtwTasks = require('./lib/tasks/wtwTasks');

var port = process.env.port || 1337;

//var tasksQueue = new Queue('background tasks');
//tasksQueue.process(wtwTasks);
//tasksQueue.add(null, { repeat: { cron: '* 0/5 * * * * *' } });
//tasksQueue.add(null);
wtwTasks(null, function (err, res) {
    if (err) throw new Error(err);
});

var app = express();
var Raven = require('raven');
// Must configure Raven before doing anything else with it
Raven.config('https://f3d7634da1c7419e9dd0952e3f61168d:c7535f6053c544b4b1cfbddbaaa6bf9a@sentry.io/1093351', {
    captureUnhandledRejections: true
}).install();
// The request handler must be the first middleware on the app
app.use(Raven.requestHandler());


// favicon
app.use(favicon(path.join(__dirname, 'config', 'favicon.ico')));

// Configuring Passport
app.use(expressSession({ secret: 'b5a263ca-4f42-4ab5-9103-27f7daef3ff3' }));
app.use(cookieParser());
require('./lib/middlewares/passport')(app);

//Body-parser
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));

// CORS Enabled
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    next();
});

// set up the static html views
app.use(express.static(__dirname + '/public'));

// set up the static bower components
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// set up the static bower components
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// set up the static translation files
app.use('/i18n', express.static(__dirname + '/lib/i18n'));

// set up the API routers
app.use('/api/test', testRouter);
app.use('/api/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/api/firstQuestionnaire', firstQuestionnaireRouter);
app.use('/api/movieDBConfiguration', movieDBConfigurationRouter);
app.use('/api/movieQuestionnaire', movieQuestionnaireRouter);
app.use('/api/tvQuestionnaire', tvQuestionnaireRouter);
app.use('/api/userQuestionnaire', userQuestionnaireRouter);
app.use('/api/userTVQuestionnaire', userTVQuestionnaireRouter);
app.use('/api/movieRecommandation', movieRecommandationRouter);
app.use('/api/tvRecommandation', tvRecommandationRouter);
app.use('/api/movieDBSearch', movieSearchRouter);
app.use('/api/movieDBSearchTV', movieSearchTVRouter);
app.use('/api/movieDBGenres', movieDBGenresRouter);
app.use('/api/movie', movieRouter);
app.use('/api/tvshow', tvshowRouter);
app.use('/api/cast', castRouter);
app.use('/api/countries', countriesRouter);
app.use('/api/languages', languagesRouter);
app.use('/api/user', userRouter);
app.use('/api/friend', friendRouter);
app.use('/api/follow', followRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/timeline', timelineEventRouter);

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/signup', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/welcome', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/:id', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/movie/:id', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/tvshow/:id', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/profile', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/home', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/social', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/movies/home', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/tvshows/home', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/tvshows/watchlist', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/movies/questionnaires', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/tvshows/questionnaires', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/movies/watchlist', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/what-to-watch', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/auth/changePassword', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/error', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Error handling
// The error handler must be before any other error middleware
app.use(Raven.errorHandler());
app.use(clientErrorHandler);

movieDbService.loadConfiguration(function (err, data) {
    if (err) throw new Error(err);
    if (!err) {
        movieDbService.loadGenres(function (err, data) {
            if (err) throw new Error(err);
            if (!err) {
                app.listen(port);
            }
        });
    }
});

module.exports = app;
