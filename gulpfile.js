var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var chalk = require('chalk');

var isProduction = ($.util.env.dev || $.util.env.debug ? false : true);
var isDebug = !isProduction;

$.util.log('Environment: ' +  chalk.inverse.bold(isProduction ? 'PRODUCTION' : 'DEBUG'));

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});

gulp.task('clean', del.bind(null, ['dist/**/*']));

gulp.task('build', ['markup', 'styles', 'scripts', 'images', 'other'], function() {
    if (isProduction) {
        gulp.start('size');
    }
});

gulp.task('size', function() {
    return gulp.src('dist/**/*')
        .pipe($.size({ title: 'Build size total for', showFiles: true, gzip: true }));
});

gulp.task('watch', function() {
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*.{png,jpg}', ['images']);
    gulp.watch(['app/*.html'], ['markup']);
});

//===================================================//

gulp.task('markup', function() {
    return gulp.src('app/*.html')
        .pipe($.if(isProduction, $.minifyHtml()))
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
    gulp.src('app/styles/main.scss')
        .pipe($.if(isDebug, $.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.if(isDebug, $.sourcemaps.write()))
        .pipe($.if(isProduction, $.groupCssMediaQueries())) //no support for source maps
        .pipe($.if(isProduction, $.cleancss({ advanced: true })))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.if(isDebug, $.sourcemaps.init()))
        .pipe($.concat('app.js'))
        .pipe($.if(isProduction, $.uglify()))
        .pipe($.if(isDebug, $.sourcemaps.write()))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*.{png,jpg}')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('other', function() {
    return gulp.src('app/favicon.ico')
        .pipe(gulp.dest('dist'));
});