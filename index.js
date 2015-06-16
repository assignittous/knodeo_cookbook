#!/usr/bin/env node
var fs, gulp, help, logger, noOp, pkg, program, result, subcommand;

require('sugar');

pkg = require('./package.json');

program = require('commander');

logger = require('./logger').Logger;

fs = require('fs-extra');

gulp = require('gulp');

noOp = function() {
  return console.log("Nothing ran, couldn't understand your command");
};

program.version(pkg.version, '-v, --version');

subcommand = {};

help = program.command('help');

help.description('Create a new thing');

help.action(function() {
  return require('./about');
});

subcommand.init = program.command('init');

subcommand.init.description('Initialize cookbook for the current working folder');

subcommand.init.action(function() {
  var confTemplatePath, mainModulePath, source, target;
  mainModulePath = process.mainModule.filename;
  confTemplatePath = mainModulePath.replace('index.js', 'src/recipes/config.cookbook.template.cson');
  source = confTemplatePath;
  target = "config.cookbook.cson";
  return fs.readFile(target, function(err, paths) {
    if (err) {
      console.log(err);
      console.log("should copy config");
      return fs.copySync(source, target);
    } else {
      return logger.warn("Config file already exists. Please manually delete it and try again.");
    }
  });
});

subcommand["new"] = program.command('update');

subcommand["new"].description('Create a new thing');

subcommand["new"].action(function() {
  var confTemplatePath, mainModulePath;
  mainModulePath = process.mainModule.filename;
  confTemplatePath = mainModulePath.replace('index.js', 'src/recipes/**/*.jade');
  logger.info("Move recipes from: " + confTemplatePath);
  return gulp.src(confTemplatePath).pipe(gulp.dest("_workshop/recipes"));
});

result = program.parse(process.argv);
