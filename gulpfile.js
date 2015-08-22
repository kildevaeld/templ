'use strict';

const gulp = require('gulp'),
	tsc = require('gulp-typescript'),
	tsconfig = require('./tsconfig'),
	concat = require('gulp-concat'),
	wrap = require('gulp-wrap-umd'),
	merge = require('merge2');

var tsp = tsc.createProject('tsconfig.json', {
		sortOutput:true,
		declarationFiles: true,
    noExternalResolve: true,
		target:'es5'
	});

gulp.task('build', function () {
	var result = tsp.src('./src/**/*.ts')
	.pipe(tsc(tsp))

	let js = result.js.pipe(concat('templ.js'))
	.pipe(wrap({
		namespace: 'templ',
		exports: 'templ'
	})).pipe(gulp.dest('./dist'));
	
	return merge([
		js, result.dts.pipe(gulp.dest('./dist'))
	])
});


gulp.task('watch', ['build'], function () {
	gulp.watch('./src/**/*.ts',['build']);
})

gulp.task('default', ['build']);