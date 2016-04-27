const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', function() {
  return gulp.src('test/**/*test.js')
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['test']);
