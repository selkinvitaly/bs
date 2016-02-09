"use strict";

const gulp   = require("gulp");
const gutil  = require("gulp-util");
const gulpIf = require("gulp-if");

module.exports = function(options) {
  let src  = options && options.src;
  let dest = options && options.dest;

  if (!src || !dest) {
    throw new gutil.PluginError("gulp", "js:copy: incorrect config", {showStack: true});
  }

  return function() {
    return gulp.src(src, {since: gulp.lastRun("js:copy")})
      .pipe(gulp.dest(dest));
  };

};
