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
	rename = require('gulp-rename'),
	insert = require('gulp-insert');

var tsp = tsc.createProject('tsconfig.json', {
		sortOutput:true,
		declarationFiles: true,
    noExternalResolve: true,
		target:'es5'
	});
var pkg = require('./package.json')

const reg = /\/\/\/\s?<reference path=\"[a-zA-Z0-9.\/]*\"\s?\/>/gi


gulp.task('build', function () {
	var result = tsp.src('./src/**/*.ts')
	.pipe(tsc(tsp))

	let js = result.js
	.pipe(replace(reg, ''))
	.pipe(replace('$$version$$', pkg.version))
	.pipe(concat('templ.js'))
	.pipe(wrap({
		namespace: 'templ',
		exports: 'templ'
	}))
	.pipe(pretty({
		indentSize: 2,
		preserveNewlines: false,
	})).pipe(gulp.dest('./dist'));

	let dst = result.dts
	.pipe(rename('templ.d.ts'))
	.pipe(insert.prepend('declare module "templ" {\n\texport = templ\n}\n\n'))
	.pipe(gulp.dest('./'));

	return merge([
		js, dst
	]);
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

const bump = require('gulp-bump');

gulp.task('bump:patch', function () {
	gulp.src(['package.json','bower.json'])
	.pipe(bump())
	.pipe(gulp.dest('.'));
});

gulp.task('bump:minor', function () {
	gulp.src(['package.json','bower.json'])
	.pipe(bump({type:'minor'}))
	.pipe(gulp.dest('.'));
});

gulp.task('bump:major', function () {
	gulp.src(['package.json','bower.json'])
	.pipe(bump({type:'major'}))
	.pipe(gulp.dest('.'));
});