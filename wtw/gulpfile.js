/// <binding BeforeBuild='lint-front-end-code, lint-server-code, style-server-code, compile-ts, inject-front-end-dependancies' />
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

gulp.task('inject-front-end-dependancies', function () {
    return gulp.src(config.index)
        .pipe(wiredep({}))
        .pipe(gulp.dest(config.publicFolder));
});

gulp.task('compile-ts', function () {
    var tsProject = $.typescript.createProject(config.tsConfig);
    return gulp.src(config.allts)
        .pipe(tsProject())
        .pipe(gulp.dest(config.publicFolder + 'js/'));
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

gulp.task('serve-dev', function () {
    return runSequence('clean',
        'lint-server-code',
        'style-server-code',
        'lint-front-end-code',
        'compile-ts',
        'compile-less',
        'inject-front-end-dependancies');
});
