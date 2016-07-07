/* jshint node: true */

var fs = require('fs');
var util = require('util');

var gulp = require('gulp');
var del = require('del');
var zip = require('gulp-zip');
var jimp = require('gulp-jimp');
var imagemin = require('gulp-imagemin');

var stylelint = require('gulp-stylelint');

var pkg = require('./package.json');

var lesssrc = 'main.less';
var source = [
    'package.json',
    lesssrc
];
var dest = 'bin';

gulp.task('clean', function() {
    return del(dest);
});

gulp.task('zip', ['clean'], function() {
    var filename = util.format('%s.zip', pkg.name);
    
    return gulp.src(source)
        .pipe(zip(filename))
        .pipe(gulp.dest(dest));
});

gulp.task('img', function() {
    return gulp.src('art/*')
//        .pipe(jimp({
//            '': { resize: { width: 1000, mode: 'bezierInterpolation' } }
//        }))
		.pipe(imagemin())
		.pipe(gulp.dest('images'));
});

gulp.task('build', ['zip']);

// still doesn't work well, but actually works
gulp.task('lint', function() {
    return gulp.src(lesssrc)
        .pipe(stylelint({
            reporters: [
                {
                    formatter: 'string',
                    console: true
                }
            ],
            syntax: 'less'
        }));
});

gulp.task('default', ['lint'], function() {
    return gulp.start('build');
});
