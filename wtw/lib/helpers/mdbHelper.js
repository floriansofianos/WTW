var RateLimiter = require('limiter').RateLimiter;
var limiter = new RateLimiter(3, 'second');
var mdb = require('moviedb')('d03322a5a892ce280f22234584618e9e');

module.exports = function () {
    var makeMovieDBRequest = function(method, parameters, done) {
        limiter.removeTokens(1, function (err, remainingRequests) {
            if (err) return done(err);
            mdb[method](parameters, (err, data) => {
                done(err, data);
            });
        });
    }
    return {
        makeMovieDBRequest: makeMovieDBRequest
    }
}