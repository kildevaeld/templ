'use strict';

const gulp = require('gulp'),
  readdir = require('recursive-readdir'),
  jetpack = require('fs-jetpack'),
  gutil = require('gulp-util'),
  tsc = require('gulp-typescript'),
  merge = require('merge2'),
  babel = require('gulp-babel'),
  pegjs = require('pegjs');


gulp.task('addfiles', (done) => {
  let tsconfig = jetpack.read('./tsconfig.json', 'json');

  readdir(process.cwd() + '/src', function (e, files) {
    tsconfig.files = files.filter(function (file) {
      var len = file.length;

      if (/bower_components/.test(file) || /node_modules/.test(file)) return false;
      //console.log(file.test(/bower_components/))
      return file.substr(len - 3) === '.ts' && file.substr(len - 5) !== ".d.ts";
    }).map(function (file) {

      return file.replace(process.cwd() +'/', '');
    });
    tsconfig.files.push('typings/index.d.ts');
    jetpack.write('./tsconfig.json', tsconfig);
    gutil.log('Added ' + tsconfig.files.length + ' files')
    done();
  });

});

const project = tsc.createProject('./tsconfig.json', {
  declarationFiles: true,
  preserveConstEnums: false
});

gulp.task('build', ['parser'], () => {

  let result = project.src()
  .pipe(tsc(project));

  let js = result.js
  .pipe(babel({
    compact: false,
    presets: ["es2015-loose", 'stage-0'],
  }))
  .pipe(gulp.dest('./lib'));

  return merge([
    js, result.dts.pipe(gulp.dest('./lib'))
  ])

});

gulp.task('parser', () => {
  return jetpack.readAsync('./grammar/parser.pegjs')
  .then((source) => {
    let parser = pegjs.buildParser(source, {
      output: 'source',
      optimize: 'speed'
    });
    parser = "exports.parser = " + parser
    return jetpack.writeAsync('./src/parser.js', parser)
  })

});
