"use strict";

const gulp  = require("gulp");
const bsync = require("browser-sync").create();

const root = __dirname;

const config   = require("./build/config/gulp")(root);
const lazyTask = require("./build/helpers/lazyTask")(root);

gulp.task("clean", lazyTask("./build/tasks/clean", {
  dest: config.tasks.clean.dest
}));

gulp.task("img", lazyTask("./build/tasks/img", {
  src: config.tasks.img.src,
  dest: config.tasks.img.dest,
  plugins: config.plugins
}));

gulp.task("sprite", lazyTask("./build/tasks/sprite", {
  src: config.tasks.sprite.src,
  dest: config.tasks.sprite.dest,
  plugins: config.plugins
}));

gulp.task("fonts", lazyTask("./build/tasks/fonts", {
  src: config.tasks.fonts.src,
  dest: config.tasks.fonts.dest
}));

gulp.task("bsync", lazyTask("./build/tasks/bsync", {
  server: bsync,
  plugins: config.plugins,
  paths: config.tasks.bsync
}));

gulp.task("css", lazyTask("./build/tasks/css", {
  src: config.tasks.css.src,
  dest: config.tasks.css.dest,
  plugins: config.plugins
}));

gulp.task("html", lazyTask("./build/tasks/html", {
  src: config.tasks.html.src,
  dest: config.tasks.html.dest,
  plugins: config.plugins
}));

gulp.task("js", lazyTask("./build/tasks/js", {
  src: config.tasks.js.src,
  dest: config.tasks.js.dest,
  plugins: config.plugins
}));

gulp.task("js:copy", lazyTask("./build/tasks/js-copy", {
  src: config.tasks.jsCopy.src,
  dest: config.tasks.jsCopy.dest
}));

gulp.task("copy", gulp.parallel("img", "fonts", "js:copy", "sprite"));

gulp.task("build", gulp.series("clean", gulp.parallel("copy", "css", "html", "js")));

gulp.task("watch", lazyTask("./build/tasks/watch", {
  paths: config.tasks.watch
}));
