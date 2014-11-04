'use strict';

module.exports = function imageSet() {
  return function imageSet(css) {
    var walk = require('rework-walk');
    walk(css, function(rule, node) {
      return rule;
    });
  };
};
