/* jshint node: true */

var gulp = require('gulp');
var del = require('del');
var zip = require('gulp-zip');

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
    var filename = 'catdad.one-gray.v' + pkg.version + '.zip';
    
    return gulp.src(source)
        .pipe(zip(filename))
        .pipe(gulp.dest(dest));
});

gulp.task('build', ['zip']);


// Doesn't actually work, docsk are wrong

//var fs = require('fs');
//var Lesshint = require('lesshint');

//gulp.task('lint', function() {
//    var hint = new Lesshint();
//    
//    var lessStr = fs.readFileSync(lesssrc, 'utf8');
//    
//    var reporter = hint.getReporter();
//    var errors = hint.checkString(lessStr);
//    
//    reporter.report(errors);
//});
