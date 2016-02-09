"use strict";

const path  = require("path");
const isDev = require("../helpers/isDev");

module.exports = function(root) {
  let cfgWebpack = require("./webpack")(root);
  let tasks = {

    clean: {
      dest: "./dist/"
    },

    img: {
      src: ["./frontend/img/!(base64|sprite)", "./frontend/img/!(base64|sprite)/**/*.*"],
      dest: "./dist/assets/img/"
    },

    jsCopy: {
      src: ["./frontend/js/vendor/jquery-3.0.0-beta1.min.js", "./frontend/js/vendor/svg4everybody.min.js"],
      dest: "./dist/assets/js/"
    },

    cheerio: {
      run: function($) {
        $("[fill]").removeAttr("fill");
        $("[style]").removeAttr("style");
      },
      parserOptions: { xmlMode: true }
    },

    sprite: {
      src: ["./frontend/img/sprite/**/*.svg"],
      dest: "./dist/assets/img/"
    },

    fonts: {
      src: "./frontend/fonts/**/*.*",
      dest: "./dist/assets/fonts/"
    },

    css: {
      src: ["./frontend/css/*.styl"],
      dest: "./dist/assets/css/"
    },

    html: {
      dest: "./dist/",
      src: ["./frontend/html/*.jade"],
      basedir: "./frontend/html/"
    },

    watch: {
      js: "./frontend/js/**/*.js",
      css: "./frontend/css/**/*.styl",
      html: "./frontend/html/**/*.jade",
      fonts: "./frontend/fonts/**/*.*",
      img: "./frontend/img/content/**/*.*",
      base64: "./frontend/img/base64/*.*",
      sprite: "./frontend/img/sprite/**/*.svg"
    }

  };

  let plugins = {

    autoprefixer: {
      browsers: ["last 2 versions", "Firefox ESR", "ie >= 9"]
    },

    browserSync: {
      server: {
        baseDir: "dist/",
        index: "index.html"
      },
      ghostMode: false,
      ui: false,
      notify: false,
      open: false
    },

    stylus: {
      compress: !isDev
    },

    svgSprite: {
      mode: {
        symbol: {
          dest: "./",
          bust: false,
          sprite: "sprite.svg"
        }
      },
      shape: {
        spacing: {
          box: "padding"
        }
      }
    },

    cssBase64: {
      baseDir: "frontend/img/base64/",
      extensions: [/\.svg#base64/i],
      exclude: [],
      maxImageSize: 10 * 1024, // bytes
      debug: false
    },

    jadeInheritance: {
      basedir: tasks.html.basedir
    },

    imagemin: {
      progressive: true
    },

    jade: {
      pretty: isDev
    },

    webpack: cfgWebpack,

    webpackOutput: {
      hash: true,
      version: false,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      cached: true,
      colors: true
    }

  };

  return {
    tasks: tasks,
    plugins: plugins
  };

};
