var express = require('express');
var testRouter = require('./lib/routes/testRoutes')();
var adminRouter = require('./lib/routes/adminRoutes')();
var authRouter = require('./lib/routes/authRoutes')();
var firstQuestionnaireRouter = require('./lib/routes/firstQuestionnaireRoutes')();
var movieDBConfigurationRouter = require('./lib/routes/movieDBConfigurationRoutes')();
var movieQuestionnaireRouter = require('./lib/routes/movieQuestionnaireRoutes')();
var movieRecommandationRouter = require('./lib/routes/movieRecommandationRoutes')();
var userQuestionnaireRouter = require('./lib/routes/userQuestionnaireRoutes')();
var movieSearchRouter = require('./lib/routes/movieDBSearchRoutes')();
var movieDBGenresRouter = require('./lib/routes/movieDBGenresRoutes')();
var movieRouter = require('./lib/routes/movieRoutes')();
var castRouter = require('./lib/routes/castRoutes')();
var cookieParser = require('cookie-parser');
var passport = require('passport');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var logErrors = require('./lib/middlewares/logErrors');
var clientErrorHandler = require('./lib/middlewares/clientErrorHandler');
var winston = require('winston');
var favicon = require('serve-favicon');
var path = require('path');
var movieDbService = require('./lib/helpers/movieDBService')();
var Queue = require('bull');
var wtwTasks = require('./lib/tasks/wtwTasks');

var port = process.env.port || 1337;

winston.configure({
    transports: [
        new (winston.transports.File)({ filename: 'logFile.log' })
    ]
});

//var tasksQueue = new Queue('background tasks');
//tasksQueue.process(wtwTasks);
//tasksQueue.add(null, { repeat: { cron: '* 0/5 * * * * *' } });
//tasksQueue.add(null);
wtwTasks(null, function () { });

var app = express();

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
app.use('/api/userQuestionnaire', userQuestionnaireRouter);
app.use('/api/movieRecommandation', movieRecommandationRouter);
app.use('/api/movieDBSearch', movieSearchRouter);
app.use('/api/movieDBGenres', movieDBGenresRouter);
app.use('/api/movie', movieRouter);
app.use('/api/cast', castRouter);

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
app.get('/user/home', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/movies/home', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/movies/questionnaires', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/movies/watchlist', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/what-to-watch', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/error', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Error handling
app.use(logErrors);
app.use(clientErrorHandler);

movieDbService.loadConfiguration(function(err, data) {
    if (!err) {
        movieDbService.loadGenres(function(err, data) {
            if (!err) {
                app.listen(port);
            }
        });
    }
});

module.exports = app;
