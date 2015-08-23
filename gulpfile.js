'use strict';

const gulp = require('gulp'),
	tsc = require('gulp-typescript'),
	tsconfig = require('./tsconfig'),
	concat = require('gulp-concat'),
	wrap = require('gulp-wrap-umd'),
	merge = require('merge2'),
	pretty = require('gulp-beautify'),
	replace = require('gulp-replace'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

var tsp = tsc.createProject('tsconfig.json', {
		sortOutput:true,
		declarationFiles: true,
    noExternalResolve: true,
		target:'es5'
	});

const reg = /\/\/\/\s?<reference path=\"[a-zA-Z0-9.\/]*\"\s?\/>/gi

gulp.task('build', function () {
	var result = tsp.src('./src/**/*.ts')
	.pipe(tsc(tsp))

	let js = result.js
	.pipe(replace(reg, ''))
	.pipe(concat('templ.js'))
	.pipe(wrap({
		namespace: 'templ',
		exports: 'templ'
	}))
	.pipe(pretty({
		indentSize: 2,
		preserveNewlines: false,
	})).pipe(gulp.dest('./dist'));
	
	return merge([
		js, result.dts.pipe(gulp.dest('./dist'))
	])
});

gulp.task('uglify', ['build'], function () {
	gulp.src('./dist/templ.js')
	.pipe(uglify())
	.pipe(rename('templ.min.js'))
	.pipe(gulp.dest('./dist'))
	
});

gulp.task('watch', ['build'], function () {
	gulp.watch('./src/**/*.ts',['build']);
})

gulp.task('default', ['build', 'uglify']);