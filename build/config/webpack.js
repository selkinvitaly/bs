"use strict";

const path         = require("path");
const hash         = require("../helpers/hash");
const isDev        = require("../helpers/isDev");
const isWatched    = require("../helpers/isWatched");
const webpack      = require("webpack");
const AssetsPlugin = require("assets-webpack-plugin");

module.exports = function(root) {

  let options = {
    watch: isWatched,
    context: root,
    output: {
      path: root,
      filename: hash("[name].js", "chunkhash", isDev),
      chunkFilename: hash("[id].js", "chunkhash", isDev),
      publicPath: "",
      pathinfo: isDev
    },
    debug: isWatched,
    devtool: isWatched ? "cheap-module-source-map" : null,
    resolve: {
      modulesDirectories: ["node_modules"],
      extensions: ["", ".js", ".jsx"]
    },
    resolveLoader: {
      modulesDirectories: ["node_modules"],
      extensions: ["", ".loader.js", ".js"],
      moduleTemplates: ["*-loader", "*"]
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: path.join(root, "./frontend/js/"),
          loader: "babel?presets[]=es2015,plugins[]=transform-runtime"
        }
      ]
    }
  };

  // optimize
  if (!isDev) {
    options.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  }

  // JSON of assets for bundles
  if (!isDev) {
    options.plugins.push(new AssetsPlugin({
      path: path.join(root, "dist"),
      filename: "webpack.json",
      prettyPrint: true
    }));
  }

  return options;
};
