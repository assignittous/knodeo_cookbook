
/*

 * Compile cookbook

`gulp compile`


---
 */
var coffee, csonPath, gulp, indexPath, inject, plumber, recipePath, sourcePath, targetPath, watchPath;

gulp = require("gulp");

coffee = require("gulp-coffee");

plumber = require("gulp-plumber");

inject = require("gulp-inject-string");

watchPath = ["./src/**/*.coffee", "./src/recipes/**/*"];

indexPath = ["./src/index.coffee"];

sourcePath = ["./src/**/*.coffee", "!./src/index.coffee"];

csonPath = ["./src/**/*.cson", "!./src/**/*.template.cson"];

recipePath = ["./src/recipes/**/*", "!./src/recipes/**/*.gitkeep", "!./src/recipes/*.cson"];

targetPath = "./";

module.exports = function() {
  gulp.src(sourcePath).pipe(plumber()).pipe(coffee({
    bare: true
  })).pipe(gulp.dest(targetPath));
  gulp.src(indexPath).pipe(plumber()).pipe(coffee({
    bare: true
  })).pipe(inject.prepend("#!/usr/bin/env node\n")).pipe(gulp.dest(targetPath));
};

module.exports.watch = watchPath;
