var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var chalk = require('chalk');

var isProduction = ($.util.env.dev || $.util.env.debug ? false : true);
var isDebug = !isProduction;

$.util.log('Environment: ' + chalk.inverse.bold(isProduction ? 'PRODUCTION' : 'DEBUG'));

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});

gulp.task('clean', del.bind(null, ['dist/**/*']));

gulp.task('build', ['markup', 'styles', 'scriptLibs', 'scripts', 'images', 'content', 'other'], function() {
    if (isProduction) {
        gulp.start('size');
    }
});

gulp.task('size', function() {
    return gulp.src('dist/**/*')
        .pipe($.size({ title: 'Build size total for', showFiles: true, gzip: true }));
});

gulp.task('watch', ['build'], function() {
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch(['app/**/*.html'], ['markup']);
    console.log('Now watching: styles, scripts, markup');
});

//===================================================//

gulp.task('markup', function() {
    return gulp.src('app/**/*.html')
        .pipe($.if(isProduction, $.minifyHtml()))
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
    gulp.src('app/styles/main.scss')
        .pipe($.if(isDebug, $.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.if(isDebug, $.sourcemaps.write()))
        .pipe($.if(isProduction, $.groupCssMediaQueries())) //no support for source maps
        .pipe($.if(isProduction, $.cleancss({ advanced: true })))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('scriptLibs', function() {
    gulp.src([
        'bower_components/requirejs/require.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-loading-bar/build/loading-bar.js'
    ])//TODO: concat all libs?
        .pipe($.concat('core.js'))
        .pipe($.if(isProduction, $.uglify()))
        .pipe(gulp.dest('dist/libs'));
});

gulp.task('scripts', function() {
    return gulp.src('app/**/*.ts')
        .pipe($.if(isDebug, $.sourcemaps.init()))
        .pipe($.typescript({ module: 'amd' }))
        .pipe($.if(isProduction, $.ngAnnotate()))
        .pipe($.if(isProduction, $.uglify()))
        .pipe($.if(isDebug, $.sourcemaps.write()))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*.{svg,png,jpg}')
        .pipe($.if(isProduction, $.imagemin({
            progressive: true,
            multipass: true,
            svgoPlugins: [
                { removeViewBox: true },
                { removeUselessStrokeAndFill: true },
                { removeEmptyAttrs: true }
            ]
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('content', function() {
    return gulp.src('app/content/**/*')
        .pipe(gulp.dest('dist/content'));
});

gulp.task('other', function() {
    gulp.src(['app/favicon.ico'])
        .pipe(gulp.dest('dist'));

    gulp.src(['mock-data/**/*.json'])
        .pipe(gulp.dest('dist/mock-data'));

    gulp.src('bower_components/apache-server-configs/dist/.htaccess')
        .pipe($.if(isProduction, gulp.dest('dist')));
});