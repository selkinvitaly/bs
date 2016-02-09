"use strict";

module.exports = function(template, hash, dev) {
  return !dev ? template.replace(/\.[^.]+$/, `_[${hash}]$&`) : template;
};
