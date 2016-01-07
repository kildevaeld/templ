'use strict';

const gulp = require('gulp');
const bump = require('gulp-bump');

gulp.task('bump:patch', function () {
	return gulp.src(['package.json','bower.json'])
	.pipe(bump())
	.pipe(gulp.dest('.'));
});

gulp.task('bump:minor', function () {
	return gulp.src(['package.json','bower.json'])
	.pipe(bump({type:'minor'}))
	.pipe(gulp.dest('.'));
});

gulp.task('bump:major', function () {
	return gulp.src(['package.json','bower.json'])
	.pipe(bump({type:'major'}))
	.pipe(gulp.dest('.'));
});