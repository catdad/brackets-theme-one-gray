/* jshint node: true */

var util = require('util');
var path = require('path');

var gulp = require('gulp');
var del = require('del');
var shellton = require('shellton');
var sequence = require('run-sequence');
var zip = require('gulp-zip');
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

gulp.task('zip', function() {
    var filename = util.format('%s.zip', pkg.name);
    
    return gulp.src(source)
        .pipe(zip(filename))
        .pipe(gulp.dest(dest));
});

gulp.task('img', function() {
    return gulp.src('art/*')
        .pipe(imagemin())
        .pipe(gulp.dest('images'));
});

gulp.task('errors', function(done) {
    var p = path.resolve('./node_modules/.bin') + path.delimiter + process.env.PATH;
    
    shellton({
        task: 'lessc --lint ' + lesssrc,
        stdout: process.stdout,
        stderr: process.stderr,
        env: {
            PATH: p
        }
    }, done);
});

// still doesn't work well, but actually works
gulp.task('lint', function() {
    return gulp.src(lesssrc)
        .pipe(stylelint({
            reporters: [{
                formatter: 'string',
                console: true
            }],
            syntax: 'less'
        }));
});

gulp.task('test', function(done) {
    sequence('errors', 'lint', done);
});

gulp.task('build', ['test', 'clean'], function() {
    return gulp.start('zip');
});

gulp.task('default', ['build']);
