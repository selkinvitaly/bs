"use strict";

const gutil    = require("gulp-util");
const webpack  = require("webpack");
const notifier = require("node-notifier");

module.exports = function(options) {
  let plugins = options && options.plugins;

  if (!plugins) {
    throw new gutil.PluginError("webpack", "js: incorrect config", {showStack: true});
  }

  return function(cb) {

    webpack(plugins.webpack, function(err, stats) {
      if (!err) {
        err = stats.toJson().errors[0];
      }

      if (err) {
        notifier.notify({
          title: "JS task",
          message: err
        });

      }

      gutil.log("[webpack]", stats.toString(plugins.webpackOutput));

      cb();
    });

  };

};
