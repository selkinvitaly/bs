"use strict";

const path = require("path");

module.exports = function(root) {

  return function(passedPath) {
    let args = Array.prototype.slice.call(arguments, 1);

    return function(cb) {
      let taskPath = transformPath(passedPath);
      let taskFunc = require(taskPath).apply(this, args);

      return taskFunc(cb);
    };
  };

  // transforms the relative path to the task
  // example: "./build/tasks/clean" -> "../tasks/clean"
  function transformPath(passedPath) {
    let absolute = path.resolve(root, passedPath);

    return path.relative(__dirname, absolute);
  }

};
