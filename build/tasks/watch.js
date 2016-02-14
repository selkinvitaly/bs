"use strict";

const gulp  = require("gulp");
const gutil = require("gulp-util");

module.exports = function(options) {
  let paths  = options && options.paths;

  if (!paths) {
    throw new gutil.PluginError("gulp", "watch: incorrect config", {showStack: true});
  }

  return gulp.series("build", gulp.parallel(function(cb) {
    gulp.watch(paths.jsCopy, gulp.parallel("js:copy"));
    gulp.watch(paths.css, gulp.parallel("css"));
    gulp.watch(paths.base64, gulp.parallel("css"));
    gulp.watch(paths.html, gulp.parallel("html"));
    gulp.watch(paths.fonts, gulp.parallel("fonts"));
    gulp.watch(paths.img, gulp.parallel("img"));
    gulp.watch(paths.sprite, gulp.parallel("sprite"));
    cb();
  }, "bsync"));

};
