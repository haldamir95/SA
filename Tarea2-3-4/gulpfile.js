var gulp = require('gulp');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');

gulp.task('runUploader', async function () {
    gulp.src('./src/**')
        .pipe(tar('archive.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('./dist')) // if you want a local copy
});