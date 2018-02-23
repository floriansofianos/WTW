var userService = require('../helpers/userService')();
var library = require('../helpers/library')();

module.exports = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    else if (req.headers['authorization']) {
        // Maybe JWT Token
        var decodedJWT = library.decodeJWT(req.headers['authorization'].replace('JWT ', ''));
        if (decodedJWT) {
            userService.getUserById(decodedJWT.id, function (err, user) {
                if (err) { return res.send(401); }
                if (!user) { return res.send(401); }
                else req.user = user;
                return next();
            });
        }
    }
    else res.send(401);
}