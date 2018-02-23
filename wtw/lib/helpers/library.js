var jwt = require('jwt-simple');
var jwtSecret = 'wtwjwtokensecret'

module.exports = function () {
    var randomInt = function(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    var encodeJWT = function (id) {
        return jwt.encode({ id: id }, jwtSecret);
    }

    var decodeJWT = function (token) {
        return jwt.decode(token, jwtSecret);
    }

    return {
        randomInt: randomInt,
        encodeJWT: encodeJWT,
        decodeJWT: decodeJWT
    }
}