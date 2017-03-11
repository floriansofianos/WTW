var gulp = require('gulp');
var config = require('./config/gulp.config')();
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('lint-server-code', function() {
    gulp.src(config.alljs)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', { verbose: true }));
});

gulp.task('style-server-code', function() {
    gulp.src(config.alljs)
        .pipe(jscs({ configPath: config.configFolder + 'jscs.config.jscsrc'}))
        .pipe(jscs.reporter());
});
