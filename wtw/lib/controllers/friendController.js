var friendController = function (movieDBService) {
    var post = function (req, res) {
        if (req.body.userId) {

        }
        else res.send(400)
    };

    var deleteFriend = function (req, res) {

    };

    return {
        post: post,
        delete: deleteFriend
    }
}

module.exports = friendController;