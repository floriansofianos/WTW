module.exports = function () {
    var lib = './lib/';
    var app = './app/';
    var tests = './tests/';
    var configFolder = './config/'

    var config = {
        alljs: [lib + '*.js', './*.js', configFolder + '*.js'],
        configFolder: configFolder,
        appFolder: app,
        publicFolder: './public/',
        index: lib + 'index.html',
        indexAOT: lib + 'index-aot.html',
        allts: [app + '*.ts'],
        tsConfig: app + 'tsconfig.json',
        allLess: [app + 'less/*.less'],
        allTests: [tests + '*.js']
    };

    return config;
};