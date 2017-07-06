var express = require('express');
var testRouter = require('./lib/routes/testRoutes')();
var authRouter = require('./lib/routes/authRoutes')();

var port = process.env.port || 1337;

var app = express();

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
app.use('/auth', authRouter);

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port);

module.exports = app;
