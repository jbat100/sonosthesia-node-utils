'use strict';

// very useful guide: https://www.typescriptlang.org/docs/handbook/gulp.html

// https://www.npmjs.com/package/gulp-typescript

const gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    Config = require('./gulpfile.config'),
    tsProject = tsc.createProject('tsconfig.json');

const config = new Config();

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    const sourceTsFiles = [config.allTypeScript, // path to typescript files
        config.libraryTypeScriptDefinitions]; // reference to library .d.ts files

    // https://www.npmjs.com/package/gulp-typescript
    // You can replace gulp.src(...) with tsProject.src() to
    // load files based on the tsconfig file (based on files, excludes and includes).

    const tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init()) // sourcemaps will be generated (https://www.npmjs.com/package/gulp-typescript)
        .pipe(tsProject());

    tsResult.dts.pipe(gulp.dest(config.tsOutputPath));

    return tsResult.js
        .pipe(sourcemaps.write('.')) // the sourcemaps are added to the .js file
        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
    const typeScriptGenFiles = [
        config.tsOutputPath +'/**/*.js',    // path to all JS files auto gen'd by editor
        config.tsOutputPath +'/**/*.js.map', // path to all sourcemap files auto gen'd by editor
        '!' + config.tsOutputPath + '/lib'
    ];
    // delete the files
    del(typeScriptGenFiles, cb);
});

gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['compile-ts']);
});

gulp.task('default', ['compile-ts']);