"use strict";

const gulp    = require("gulp");
const gutil   = require("gulp-util");
const jade    = require("gulp-jade");
const jadeInh = require("gulp-jade-inheritance");
const notify  = require("gulp-notify");

module.exports = function(options) {
  let src     = options && options.src;
  let dest    = options && options.dest;
  let plugins = options && options.plugins;

  let manifest = null;

  try {
    manifest = require("../../dist/manifest.json");
  } catch (e) {}

  plugins.jade.locals = {
    assets: manifest
  }

  if (!src || !dest || !plugins) {
    throw new gutil.PluginError("gulp-jade", "html: incorrect config", {showStack: true});
  }

  return function() {
    return gulp.src(src)
      .pipe(jadeInh(plugins.jadeInheritance))
      .pipe(jade(plugins.jade))
      .on("error", notify.onError({ title: "HTML task" }))
      .pipe(gulp.dest(dest));
  };

};
