﻿var winston = require('winston');

module.exports = function (err, req, res, next) {
    winston.log('error', err.stack);
    next(err);
}