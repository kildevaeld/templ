'use strict';

const gulp = require('gulp'),
  webpack = require('webpack-stream');
  
  
gulp.task('bundle', ['build'], () => {
  return gulp.src('./lib/index.js')
  .pipe(webpack({
    output: {
      filename: 'templ.js',
      library: 'templ',
      libraryTarget: 'umd'
    },
    externals: {
      orange: "orange",
      eventsjs: "eventsjs"
    }
  }))
  .pipe(gulp.dest('./dist'));
})

