"use strict";

const path         = require("path");
const hash         = require("../helpers/hash");
const isDev        = require("../helpers/isDev");
const webpack      = require("webpack");
const AssetsPlugin = require("assets-webpack-plugin");

module.exports = function(root) {

  let options = {
    context: root,
    entry: {
      index: ["./frontend/js/index"]
    },
    output: {
      path: path.join(root, "./dist/"),
      filename: hash("assets/js/[name].js", "chunkhash", isDev),
      chunkFilename: hash("assets/js/[id].js", "chunkhash", isDev),
      publicPath: "",
      pathinfo: isDev
    },
    debug: isDev,
    devtool: isDev ? "cheap-module-source-map" : null,
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

  // minification
  if (!isDev) {
    options.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          "warnings": false,
          "drop_debugger": true,
          "drop_console" : true,
          "unsafe": true
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin()
    );
  }

  // JSON of assets for bundles
  if (!isDev) {
    options.plugins.push(new AssetsPlugin({
      path: path.join(root, "dist"),
      filename: "assets.json",
      prettyPrint: true
    }));
  }

  return options;
};
