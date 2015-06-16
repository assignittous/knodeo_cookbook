require 'sugar'


# Get listing of valid cloud services

pkg = require('./package.json')
program = require('commander')
logger = require('./logger').Logger
fs = require('fs-extra')
gulp = require('gulp')

noOp = ()-> 
  console.log "Nothing ran, couldn't understand your command"


#console.log liquibase

# version
program
.version(pkg.version, '-v, --version')

subcommand = { }



# ## `cookbook help`

help = program.command 'help'
help.description 'Create a new thing'
help.action ()->
  require('./about')





subcommand.init = program.command 'init'
subcommand.init.description 'Initialize cookbook for the current working folder'
subcommand.init.action ()->

    # copy the templates\
    mainModulePath = process.mainModule.filename
    
    confTemplatePath = mainModulePath.replace('index.js','src/recipes/config.cookbook.template.cson')

    
    source = confTemplatePath
    target = "config.cookbook.cson"    
    fs.readFile target, (err, paths) ->
      if err
        console.log err
        console.log "should copy config"
        fs.copySync source, target
      else
        logger.warn "Config file already exists. Please manually delete it and try again."
    
# todo upgrade handling new recipes


subcommand.new = program.command 'update'
subcommand.new.description 'Create a new thing'
subcommand.new.action ()->
  mainModulePath = process.mainModule.filename
  confTemplatePath = mainModulePath.replace('index.js','src/recipes/**/*.jade')    
  logger.info "Move recipes from: #{confTemplatePath}"
  gulp.src(confTemplatePath).pipe(gulp.dest("_workshop/recipes"))


result = program.parse(process.argv)

