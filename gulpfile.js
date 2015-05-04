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
    gulp.watch('app/**/*.ts', ['scripts']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/**/*.html', ['markup']);
    gulp.watch('mock-data/**/*.json', ['other']);
    console.log(chalk.blue('\nNow watching: styles, markup, scripts and mock data'));
});

//===================================================//

gulp.task('markup', function() {
    return gulp.src('app/**/*.html')
        .pipe($.if(isProduction, $.minifyHtml({
            empty: true,
            loose: true
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', ['high-contrast-theme'], function() {
    return compileStyles(gulp.src('app/styles/main.scss'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('high-contrast-theme', function() {
    return compileStyles(gulp.src('app/styles/main.scss'), 'high-contrast')
        .pipe($.rename('high-contrast.css'))
        .pipe(gulp.dest('dist/styles'));

});

function compileStyles(pipe, theme) {
    var importer;
    if (theme) {
        importer = function(url, prev, done) {
            if (url !== '../../styles/core/variables' && url.indexOf('variables') !== -1) {
                done({ file: 'themes/' + theme });
            } else {
                done(url);
            }
        }
    }
    return pipe
        .pipe($.if(isDebug, $.sourcemaps.init()))
        .pipe($.sass({ importer: importer }))
        .pipe($.autoprefixer())
        .pipe($.if(isDebug, $.sourcemaps.write()))
        .pipe($.if(isProduction, $.groupCssMediaQueries())) //no support for source maps
        .pipe($.if(isProduction, $.cleancss({ advanced: true })));
}

gulp.task('scriptLibs', function() {
    gulp.src([
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-loading-bar/build/loading-bar.js',
        'bower_components/ngDialog/js/ngDialog.js',
        'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
        'bower_components/date-utils/lib/date-utils.js',
        'bower_components/requirejs/require.js'
    ])
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
    gulp.src([
        'app/favicon.ico',
        'app/key.pem',
        'app/cert.pem'
    ])
        .pipe(gulp.dest('dist'));

    gulp.src('mock-data/**/*.json')
        .pipe(gulp.dest('dist/mock-data'));

    gulp.src(['bower_components/apache-server-configs/dist/.htaccess'])
        .pipe($.if(isProduction, gulp.dest('dist')));
});