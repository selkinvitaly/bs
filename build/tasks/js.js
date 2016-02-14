"use strict";

const gutil   = require("gulp-util");
const gulp    = require("gulp");
const webpack = require("webpack-stream");
const named   = require("vinyl-named");
const notify  = require("gulp-notify");
const gulpIf  = require("gulp-if");
const uglify  = require("gulp-uglify");

const isDev = require("../helpers/isDev");

let firstBuildReady = false;

module.exports = function(options) {
  let src     = options && options.src;
  let dest    = options && options.dest;
  let plugins = options && options.plugins;

  if (!src || !dest || !plugins) {
    throw new gutil.PluginError("webpack", "js: incorrect config", {showStack: true});
  }

  function done(err, stats) {
    firstBuildReady = true;

    if (err) {
      return;
    }

    gutil.log("[webpack]", stats.toString(plugins.webpackOutput));
  }

  return function(cb) {
    return gulp.src(src)
      .pipe(named())
      .pipe(webpack(plugins.webpack, null, done))
      .on("error", notify.onError({ title: "JS task" }))
      .pipe(gulpIf(!isDev, uglify(plugins.uglify)))
      .pipe(gulp.dest(dest))
      .on("data", () => {
        if (firstBuildReady && !cb.called) {
          cb.called = true;
          cb();
        }
      });
  };

};
