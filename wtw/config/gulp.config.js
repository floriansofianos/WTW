module.exports = function () {
    var lib = './lib/';
    var app = './app/';
    var tests = './tests/';
    var configFolder = './config/';
    var public = './public/';
    var aot = './aot/';

    var config = {
        alljs: [lib + '*.js', './*.js', configFolder + '*.js', '!rollup-config.js'],
        allJSAssets: public + 'dist/*.js',
        allCSSAssets: public + 'css/*.css',
        configFolder: configFolder,
        appFolder: app,
        publicFolder: public,
        index: lib + 'index.html',
        indexAOT: lib + 'index-aot.html',
        allts: [app + '*.ts', app + '**/*.ts', '!./app/main-aot.ts'],
        tsConfig: app + 'tsconfig.json',
        allLess: [app + 'less/*.less'],
        allTests: [tests + '*.js'],
        allAOT: aot + '**/*'
    };

    return config;
};