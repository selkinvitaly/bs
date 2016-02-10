"use strict";

const gulp  = require("gulp");
const gutil = require("gulp-util");

module.exports = function(options) {
  let server  = options && options.server;
  let plugins = options && options.plugins;
  let paths   = options && options.paths;

  if (!server || !plugins || !paths) {
    throw new gutil.PluginError("browser-sync", "bsync: incorrect config", {showStack: true});
  }

  return function() {
    server.init(plugins.browserSync);
    server.watch(paths.js).on("change", server.reload);
    server.watch(paths.css).on("change", server.reload);
    server.watch(paths.html).on("change", server.reload);
    server.watch(paths.fonts).on("change", server.reload);
    server.watch(paths.img).on("change", server.reload);
    server.watch(paths.sprite).on("change", server.reload);
  };

};
