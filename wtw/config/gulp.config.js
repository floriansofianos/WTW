module.exports = function () {
    var lib = './lib/';

    var config = {
        alljs: ['./lib/*.js', './*.js'],
        configFolder: './config/',
        publicFolder: './public/',
        index: lib + 'index.html'
    };

    return config;
};