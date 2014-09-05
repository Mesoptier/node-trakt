gulp = require "gulp"
coffee = require "gulp-coffee"
clean = require "gulp-clean"
runSequence = require "run-sequence"

gulp.task "prepublish", ["build"]

gulp.task "build", ->
  runSequence "build-clean", "build-scripts"

gulp.task "build-clean", ->
  gulp.src "lib"
    .pipe clean()

gulp.task "build-scripts", ->
  gulp.src "src/*.coffee"
    .pipe coffee()
    .pipe gulp.dest "lib"
