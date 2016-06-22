/* jshint node: true */

var fs = require('fs');
var util = require('util');

var gulp = require('gulp');
var del = require('del');
var zip = require('gulp-zip');
var jimp = require('gulp-jimp');
var imagemin = require('gulp-imagemin');

var Lesshint = require('lesshint');

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
        .pipe(jimp({
            '': { resize: { width: 1000, mode: 'bezierInterpolation' } }
        }))
		.pipe(imagemin())
		.pipe(gulp.dest('images'));
});

gulp.task('build', ['zip']);

// still doesn't work well, but actually works
gulp.task('lint', function() {
    var hint = new Lesshint();
    // without calling this, there are no errors...
    // not sure why that is, but I found it in the source
    hint.configure({ excludedFiles: [] });
    
    var lessStr = fs.readFileSync(lesssrc, 'utf8');
    
    var reporter = hint.getReporter();
    var errors = hint.checkString(lessStr);
    
    reporter.report(errors);
});
