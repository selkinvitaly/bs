"use strict";

const gulp  = require("gulp");
const gutil = require("gulp-util");

module.exports = function(options) {
  let src  = options && options.src;
  let dest = options && options.dest;

  if (!src || !dest) {
    throw new gutil.PluginError("gulp", "fonts: incorrect config", {showStack: true});
  }

  return function() {
    return gulp.src(src, {since: gulp.lastRun("fonts")})
      .pipe(gulp.dest(dest));
  };

};
