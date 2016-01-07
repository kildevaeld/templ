'use strict';

const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

gulp.task('uglify', ['bundle'], () => {
  return gulp.src('./dist/templ.js')
  .pipe(uglify())
  .pipe(rename('templ.min.js'))
  .pipe(gulp.dest('./dist'));
});