"use strict";

const gulp     = require("gulp");
const gutil    = require("gulp-util");
const imagemin = require("gulp-imagemin");

module.exports = function(options) {
  let src     = options && options.src;
  let dest    = options && options.dest;
  let plugins = options && options.plugins;

  if (!src || !dest || !plugins) {
    throw new gutil.PluginError("gulp", "img: incorrect config", {showStack: true});
  }

  return function() {
    return gulp.src(src, {since: gulp.lastRun("img")})
      .pipe(imagemin(plugins.imagemin))
      .pipe(gulp.dest(dest));
  };

};
