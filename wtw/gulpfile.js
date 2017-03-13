/// <binding BeforeBuild='lint-front-end-code, lint-server-code, style-server-code, compile-ts, inject-front-end-dependancies' />
var gulp = require('gulp');
var config = require('./config/gulp.config')();
var $ = require('gulp-load-plugins');
var wiredep = require('wiredep').stream;
var tslint = require('gulp-tslint')



gulp.task('lint-server-code', function() {
    gulp.src(config.alljs)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }));
});

gulp.task('lint-front-end-code', function () {
    gulp.src(config.allts)
        .pipe(tslint({
            configuration: require(config.configFolder + 'tslint.json')
        }))
        .pipe(tslint.report({ verbose: true }));
});

gulp.task('style-server-code', function() {
    gulp.src(config.alljs)
        .pipe($.jscs({ configPath: config.configFolder + 'jscs.config.jscsrc'}))
        .pipe($.jscs.reporter());
});

gulp.task('inject-front-end-dependancies', function () {
    gulp.src(config.index)
        .pipe(wiredep({}))
        .pipe(gulp.dest(config.publicFolder))
});

gulp.task('compile-ts', function () {
    var ts = require('gulp-typescript');
    var tsProject = ts.createProject('./app/tsconfig.json');
    gulp.src('./app/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest(config.publicFolder + 'js/'));
});