###

# Compile cookbook

`gulp compile`


---
###

gulp   = require "gulp"
coffee = require "gulp-coffee"
plumber = require "gulp-plumber"
inject = require "gulp-inject-string"
#cson = require "gulp-cson"
# paths

#binPath = ["./bin/**/*.*"]
watchPath = ["./src/**/*.coffee","./src/recipes/**/*"]
indexPath = ["./src/index.coffee"]
sourcePath = ["./src/**/*.coffee","!./src/index.coffee"]
csonPath = ["./src/**/*.cson", "!./src/**/*.template.cson"]
recipePath = ["./src/recipes/**/*", "!./src/recipes/**/*.gitkeep", "!./src/recipes/*.cson"]
targetPath = "./"


module.exports = ()->


  gulp.src(sourcePath).pipe(plumber()).pipe(coffee({bare:true})).pipe(gulp.dest(targetPath))
  gulp.src(indexPath).pipe(plumber()).pipe(coffee({bare:true})).pipe(inject.prepend("#!/usr/bin/env node\n")).pipe(gulp.dest(targetPath))
  #gulp.src(csonPath).pipe(cson()).pipe(gulp.dest(targetPath))
  #gulp.src(recipePath).pipe(gulp.dest("#{targetPath}/recipes"))

  return

module.exports.watch = watchPath