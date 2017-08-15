var express = require('express');
var testRouter = require('./lib/routes/testRoutes')();
var adminRouter = require('./lib/routes/adminRoutes')();
var authRouter = require('./lib/routes/authRoutes')();
var firstQuestionnaireRouter = require('./lib/routes/firstQuestionnaireRoutes')();
var cookieParser = require('cookie-parser');
var passport = require('passport');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var logErrors = require('./lib/middlewares/logErrors');
var clientErrorHandler = require('./lib/middlewares/clientErrorHandler');
var winston = require('winston');
var favicon = require('serve-favicon');
var path = require('path');

var port = process.env.port || 1337;

winston.configure({
    transports: [
        new (winston.transports.File)({ filename: 'logFile.log' })
    ]
});

var app = express();

// favicon
app.use(favicon(path.join(__dirname, 'config', 'favicon.ico')))

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

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/signup', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/home', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Error handling
app.use(logErrors);
app.use(clientErrorHandler);

app.listen(port);

module.exports = app;
