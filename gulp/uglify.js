'use strict';

const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  size = require('gulp-size');

gulp.task('uglify', ['bundle'], () => {
  return gulp.src('./dist/templ.js')
  .pipe(uglify())
  .pipe(rename('templ.min.js'))
  .pipe(size())
  .pipe(gulp.dest('./dist'));
});