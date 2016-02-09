"use strict";

const gulp  = require("gulp");
const gutil = require("gulp-util");

module.exports = function(options) {
  let server  = options && options.server;
  let plugins = options && options.plugins;

  if (!server || !plugins) {
    throw new gutil.PluginError("browser-sync", "bsync: incorrect config", {showStack: true});
  }

  return function() {
    server.init(plugins.browserSync);
  };

};
