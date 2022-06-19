/*!
 * Gulp SMPL Layout Builder
 *
 * @version 8.1.5
 * @author Artem Dordzhiev (Draft)
 * @type Module gulp
 * @license The MIT License (MIT)
 */

/* Get plugins */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const fs = require('fs');
const $ = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'del', 'merge-stream'], replaceString: /\bgulp[\-.]/ });
const webpack = require('webpack-stream');
const dotenv = require('dotenv');
const ENV = process.env;

/* Init environment */
dotenv.config();
if (!ENV.NODE_ENV) ENV.NODE_ENV = 'production';

/* Helpers */
function getConfig(section) {
    const config = require(`./config.${ENV.NODE_ENV}.js`);
    return section ? (config[section] ? config[section] : {}) : config;
}

/* Primary tasks */
gulp.task('default', (done) => {
    gulp.series('build:production')(done);
});

gulp.task('serve', (done) => {
    gulp.series('clean', 'images', gulp.parallel('sass', 'js'), 'html', 'browsersync', 'watch')(done);
});

gulp.task('build', (done) => {
    gulp.series('clean:dist', 'images', gulp.parallel('sass', 'js'), 'html')(done);
});

gulp.task('build:production', (done) => {
    ENV.NODE_ENV = 'production';
    gulp.series('clean:dist', 'images', gulp.parallel('sass', 'js'), 'html')(done);
});

/* Html task */
gulp.task('html', () => {
    const config = getConfig('html');

    return gulp
        .src(['./src/**/*.html', '!./src/partials/**/*'])
        .pipe(
            $.fileInclude({
                prefix: '@@',
                basepath: '@file',
                indent: true,
            })
        )
        .pipe(gulp.dest(config.dest))
        .on('end', () => {
            browserSync.reload();
        });
});

/* Sass task */
gulp.task('sass', () => {
    const config = getConfig('sass');

    return gulp
        .src('./src/assets/scss/main.scss')
        .pipe($.if(config.maps, $.sourcemaps.init()))
        .pipe($.sass(config.sassOptions).on('error', $.sass.logError))
        .pipe($.if(config.autoprefixer, $.autoprefixer(config.autoprefixerOptions)))
        .pipe($.if(config.cleanCss, $.cleanCss(config.cleanCssOptions)))
        .pipe($.if(config.maps, $.sourcemaps.write('.')))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

/* JS (webpack) task */
gulp.task('js', (done) => {
    const config = getConfig('js');

    return gulp
        .src(['./src/assets/js/**/*'])
        .pipe(webpack(require(`./webpack.${ENV.NODE_ENV}.js`)))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.dest));
});

/* Image tasks */
gulp.task('images', (done) => {
    const config = getConfig('images');

    return gulp
        .src('./src/assets/img/**/*')
        .pipe(
            $.imagemin([
                $.imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: true }],
                }),
            ])
        )
        .pipe(gulp.dest(config.dest));
});

/* Browsersync Server */
gulp.task('browsersync', (done) => {
    const config = getConfig('browserSync');
    const options = Object.assign({}, {
            server: config.dest,
        },
        config
    );

    browserSync.init(options);
    done();
});

/* Watcher */
gulp.task('watch', () => {
    gulp.watch('./src/assets/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/**/*.html', gulp.series('html'));
    gulp.watch('./src/assets/js/**/*.*', gulp.series('js'));
    gulp.watch('./src/assets/img/**/*.*', gulp.series('images'));
    gulp.watch(`./config.${ENV.NODE_ENV}.js`, gulp.parallel('html', 'js'));
    gulp.watch(`./webpack.${ENV.NODE_ENV}.js`, gulp.series('js'));
});

/* FS tasks */
gulp.task('clean', () => {
    return $.del(['./tmp/**/*'], { dot: true });
});

gulp.task('clean:dist', () => {
    return $.del(['./dist/**/*'], { dot: true });
});

var deploy = require('gulp-gh-pages');

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function() {
    return gulp.src("./dist/**/*")
        .pipe(deploy(), { branch: 'main' });
});