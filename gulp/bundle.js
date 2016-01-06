'use strict';

const gulp = require('gulp'),
  webpack = require('gulp-webpack');
  
  
gulp.task('bundle', ['build'], () => {
  gulp.src('./lib/index.js')
  .pipe(webpack({
    output: {
      filename: 'templ.js',
      library: 'templ',
      libraryTarget: 'umd'
    }
  }))
  .pipe(gulp.dest('./dist'));
})

