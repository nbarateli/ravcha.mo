const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const less = require('gulp-less');
const path = require('path');

gulp.task('less', function () {
    return gulp.src('./less/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./docs/style'));
});
gulp.task('babel', function () {
    gulp.src('./less/main.js')
        .pipe(babel({
            presets: ['env']
        })).pipe(gulp.dest('./docs/script'))
})
gulp.task('default', ['babel', 'less']);