/// <binding ProjectOpened='watch' />
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');

gulp.task('watch', function () {
    gulp.watch('ClientHooks/out/**/*.js', ['build-clienthooks']);
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