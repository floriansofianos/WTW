/// <binding BeforeBuild='lint-front-end-code, lint-server-code, style-server-code, compile-ts, inject-front-end-dependancies, serve-dev' />
var gulp = require('gulp');
var config = require('./config/gulp.config')();
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/,
    lazy: true,
    camelize: true
});
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var karmaServer = require('karma').Server;
var exec = require('child_process').exec;
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');
var gulpCopy = require('gulp-copy');

gulp.task('lint-server-code', function() {
    return gulp.src(config.alljs)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }));
});

gulp.task('lint-front-end-code', function () {
    return gulp.src(config.allts)
        .pipe($.tslint({
            configuration: require(config.configFolder + 'tslint.json')
        }))
        .pipe($.tslint.report({ verbose: true }));
});

gulp.task('style-server-code', function() {
    return gulp.src(config.alljs)
        .pipe($.jscs({ configPath: config.configFolder + 'jscs.config.jscsrc'}))
        .pipe($.jscs.reporter());
});

gulp.task('inject-front-end-dependancies-dev', function () {
    return gulp.src(config.index)
        .pipe(wiredep({}))
        .pipe(gulp.dest(config.publicFolder));
});

gulp.task('inject-front-end-dependancies-prod', function () {
    return gulp.src(config.indexAOT)
        .pipe(wiredep({}))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(config.publicFolder));
});

gulp.task('assets-revision-js', function () {
    return gulp.src(config.publicFolder + 'dist/*.js')
        .pipe(rev())
        .pipe(gulp.dest(config.publicFolder + 'dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.publicFolder + 'dist'));
});

gulp.task('assets-revision-css', function () {
    return gulp.src(config.publicFolder + 'css/*.css')
        .pipe(rev())
        .pipe(gulp.dest(config.publicFolder + 'css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.publicFolder + 'css'));
});

gulp.task('assets-revision-js-replace', function () {
    var manifest = gulp.src(config.publicFolder + 'dist/rev-manifest.json');

    return gulp.src(config.publicFolder + '/index.html')
        .pipe(revReplace({ manifest: manifest }))
        .pipe(gulp.dest(config.publicFolder));
});

gulp.task('assets-revision-css-replace', function () {
    var manifest = gulp.src(config.publicFolder + 'css/rev-manifest.json');

    return gulp.src(config.publicFolder + '/index.html')
        .pipe(revReplace({ manifest: manifest }))
        .pipe(gulp.dest(config.publicFolder));
});

gulp.task('assets-revision-clean-remainings', function (done) {
    return gulp.src([config.publicFolder + 'css/styles.css', config.publicFolder + '**/rev-manifest.json', config.publicFolder + 'dist/build.js'], { read: false })
        .pipe($.clean());
});

gulp.task('aot-transpile-prod', function (cb) {
    exec('ngc -p "tsconfig-aot.json"', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('bundle-minify-prod', function (cb) {
    exec('rollup -c rollup-config.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('assets-revision', function () {
    return runSequence('assets-revision-js',
        'assets-revision-css',
        'assets-revision-js-replace',
        'assets-revision-css-replace',
        'assets-revision-clean-remainings');
});

gulp.task('serve-prod', function () {
    console.log('Make sure the dev version works!');
    return runSequence('clean',
        'aot-transpile-prod',
        'bundle-minify-prod',
        'compile-less',
        'inject-front-end-dependancies-prod',
        'assets-revision');
});

gulp.task('compile-ts', function () {
    var tsProject = $.typescript.createProject(config.tsConfig);
    return gulp.src(config.allts)
        .pipe(tsProject())
        .pipe(gulp.dest(config.publicFolder + 'js/'));
});

gulp.task('compile-ts-in-app', function () {
    var tsProject = $.typescript.createProject(config.tsConfig);
    return gulp.src(config.allts)
        .pipe(tsProject())
        .pipe(gulp.dest(config.appFolder));
});

gulp.task('compile-less', function () {
    return gulp.src(config.allLess)
        .pipe($.less({}))
        .pipe(gulp.dest(config.publicFolder + 'css'));
});

gulp.task('clean', function (done) {
    return gulp.src(config.publicFolder + '*', { read: false })
        .pipe($.clean());
});

gulp.task('server-tests', function () {
    return gulp.src(config.allTests)
        .pipe(mocha({ }));
});

gulp.task('serve-dev', function () {
    return runSequence('clean',
        'lint-server-code',
        'style-server-code',
        'lint-front-end-code',
        'compile-ts',
        'compile-ts-in-app',
        'copy-angular-html',
        'front-end-test',
        'compile-less',
        'inject-front-end-dependancies-dev');
});

gulp.task('front-end-test', function () {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }).start();
});

gulp.task('copy-angular-html', function (done) {
    return gulp.src(config.angularHTML)
        .pipe(gulpCopy(config.publicFolder + 'js/', { prefix: 1 }));
});
