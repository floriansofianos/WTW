var mdb = require('moviedb')('d03322a5a892ce280f22234584618e9e');

module.exports = function () {
    var getRandomTenMovies = function () {
        mdb.searchMovie({ query: 'Alien' }, (err, data) => {
            var test = data;
        });
    };

    return {
        getRandomTenMovies: getRandomTenMovies
    }
}