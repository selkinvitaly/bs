"use strict";

const gulp    = require("gulp");
const gutil   = require("gulp-util");
const jade    = require("gulp-jade");
const jadeInh = require("gulp-jade-inheritance");
const gulpIf  = require("gulp-if");
const notify  = require("gulp-notify");

const isDev     = require("../helpers/isDev");
const isWatched = require("../helpers/isWatched");

module.exports = function(options) {
  let src     = options && options.src;
  let dest    = options && options.dest;
  let plugins = options && options.plugins;
  let reload  = options && options.reload;

  if (!src || !dest || !plugins || !reload) {
    throw new gutil.PluginError("gulp-jade", "html: incorrect config", {showStack: true});
  }

  return function() {
    return gulp.src(src)
      .pipe(jadeInh(plugins.jadeInheritance))
      .pipe(jade(plugins.jade))
      .on("error", notify.onError({ title: "HTML task" }))
      .pipe(gulp.dest(dest))
      .pipe(gulpIf(isWatched, reload({ stream: true })));
  };

};