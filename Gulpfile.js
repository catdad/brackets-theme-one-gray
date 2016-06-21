/* jshint node: true */

var fs = require('fs');

var gulp = require('gulp');
var del = require('del');
var zip = require('gulp-zip');

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
    var filename = pkg.name + '.v' + pkg.version + '.zip';
    
    return gulp.src(source)
        .pipe(zip(filename))
        .pipe(gulp.dest(dest));
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
