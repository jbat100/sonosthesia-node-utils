'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.tsOutputPath = './js';
        this.allJavaScript = ['./js/**/*.js'];
        this.allTypeScript = './ts/**/*.ts';
        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = './typings/main/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;