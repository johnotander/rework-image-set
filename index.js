'use strict';

var walk           = require('rework-walk'),
    balanced       = require('balanced-match'),
    toSingleQuotes = require('to-single-quotes');

var PROPERTY_IDENTIFIER = 'background-image',
    VALUE_IDENTIFIER = 'image-set',
    IMAGE_DELIMITER = ',';

module.exports = function imageSet() {
  return function imageSet(css) {
    walk(css, function(rule, node) {
      rule.declarations.forEach(function(declaration, i) {
        var property  = declaration.property,
            value = declaration.value;

        if (property === PROPERTY_IDENTIFIER && value.indexOf(VALUE_IDENTIFIER) === 0) {
          if (!balanced('(', ')', value)) {
            throw new Error(
              'rework-image-set: missing closing ")" in the value "' + value + '"'
            );
          }

          value = toSingleQuotes(value);

          var openBrace = value.indexOf('('),
              closeBrace = value.indexOf(')')

          var images = value.substr(openBrace + 1, closeBrace - openBrace - 1)
                            .split(IMAGE_DELIMITER);

          declaration.value = getDefaultImage(images);
        }
      });

      return rule;
    });
  };
};

function getDefaultImage(images) {
  return images[0].trim().match(/'(.+?)'/)[0];
}
