var express = require('express');
var port = process.env.port || 1337;

var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(port);
