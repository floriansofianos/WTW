module.exports = function () {
    var lib = './lib/';
    var app = './app/'

    var config = {
        alljs: [lib + '*.js', './*.js'],
        configFolder: './config/',
        publicFolder: './public/',
        index: lib + 'index.html',
        allts: [app + '*.ts'],
        tsConfig: app + 'tsconfig.json',
        allLess: [app + 'less/*.less']
    };

    return config;
};