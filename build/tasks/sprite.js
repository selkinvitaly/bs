"use strict";

const gulp    = require("gulp");
const gutil   = require("gulp-util");
const gulpIf  = require("gulp-if");
const sprite  = require("gulp-svg-sprite");
const cheerio = require("gulp-cheerio");
const notify  = require("gulp-notify");

module.exports = function(options) {
  let src     = options && options.src;
  let dest    = options && options.dest;
  let plugins = options && options.plugins;

  if (!src || !dest || !plugins) {
    throw new gutil.PluginError("gulp-svg-sprite", "css: incorrect config", {showStack: true});
  }

  return function() {
    return gulp.src(src)
      .pipe(cheerio(plugins.cheerio))
      .pipe(sprite(plugins.svgSprite))
      .on("error", notify.onError({ title: "Sprite task" }))
      .pipe(gulp.dest(dest));
  };

};
