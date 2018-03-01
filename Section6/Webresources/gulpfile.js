/// <binding ProjectOpened='watch-clienthooks, watch-clientui' />
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var concat = require('gulp-concat');

var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var argv = require('yargs').default('configuration', 'Debug').argv

gulp.task('watch-clienthooks', function () {
    gulp.watch('ClientHooks/out/**/*.js', ['build-clienthooks']);
});

gulp.task('watch-clientui', function () {
    gulp.watch('ClientUI/out/**/*.js', ['build-clientui']);
});

gulp.task('build-clienthooks', () => {
    gulp.src([
        './ClientHooks/out/ClientHooks.js'
    ])
        .pipe(sourcemaps.init(
            {
                loadMaps: true
            }))
        .pipe(sourcemaps.write('./',
            {
                includeContent: false,
                sourceRoot: '/ClientHooks/src'
            }))
        .pipe(gulp.dest('./Webresources/sf365_/js'));
})

gulp.task('build-clientui', () => {

    var isRelease = argv.configuration === 'Release';
    gulp.src([
        './Clientui/out/Clientui.js'
    ])
        .pipe(gulpif(!isRelease, sourcemaps.init(
            {
                loadMaps: true
            })))
        .pipe(gulpif(!isRelease, sourcemaps.write('./',
            {
                includeContent: false,
                sourceRoot: '/Clientui/src'
            })))
        .pipe(gulpif(isRelease, uglify()))
        .on('error', function (err) {
            console.error('Error in uglify task', err.toString());
        })
        .pipe(gulp.dest('./Webresources/sf365_/js'));
})

gulp.task('build-clientui-lib',
    () => {
        gulp.src([
            './node_modules/jquery/dist/jquery.js',
            './libs/jqueryui/jquery-ui.js',
            './node_modules/knockout/build/output/knockout-latest.js',
            './libs/knockout-sortable.js',
            './node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.js'
        ])

            .pipe(concat('ClientUILibs.js'))
            .pipe(gulp.dest('./Webresources/sf365_/js'));

    });

