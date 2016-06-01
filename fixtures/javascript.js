/* jshint node: true */

var util = require('util');
var async = require('async');
var _ = require('lodash');

function SomeClass() {
    this.thing = 'stuff';
    this.opts = {};
}

SomeClass.prototype.func = function someClassFunc(opts) {
    this.opts = opts;
};

/**
 * long comment
 * mark this as deprecated
 */
var runTestsArray = util.deprecate(function runTestsArrayDeprecated(options, callback) {
    
    var defaultOpts = {
        filepath: opts.path,
        // set default values
        threads: 1,
        opt: null
    };
    
    var testsToRun = options.tests.map(function(opts) {
        return function runSingleTest(done) {
            forkmaster(
                _.merge(defaultOpts, options),
                done
            );
        };
    });
    
    async.series(testsToRun, function(err) {
        callback(err);
    });
    
}, util.format(
    'DEPRECATION NOTICE: %s\n%s\n%s',
    'options.tests is deprecated.',
    'Use a single test object in options.test.',
    'options.tests will be removed in v0.1.0'
));

function generator(someval) {
    return function generatedFunc(one, two) {
        one = two + someval;
        return one;
    };
}

function usesBind(func) {
    return func.bind({
        prop: 'val'
    });
}

module.exports = {
    generator: generator,
    runTestsArray: runTestsArray
};
