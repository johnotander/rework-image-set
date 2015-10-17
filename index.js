'use strict'

var walk = require('rework-walk')
var balanced = require('balanced-match')
var toSingleQuotes = require('to-single-quotes')

var PROPERTY_IDENTIFIER = 'background-image'
var VALUE_IDENTIFIER = 'image-set'
var IMAGE_DELIMITER = ','

module.exports = function () {
  return function imageSet (css) {
    walk(css, function (rule, node) {
      rule.declarations.forEach(function (declaration, i) {
        var property = declaration.property
        var value = declaration.value

        if (property === PROPERTY_IDENTIFIER && value.indexOf(VALUE_IDENTIFIER) === 0) {
          if (!balanced('(', ')', value)) {
            throw new Error(
              'rework-image-set: missing closing ")" in the value "' + value + '"'
            );
          }

          value = toSingleQuotes(value);

          var openBrace = value.indexOf('(')
          var closeBrace = value.indexOf(')')

          var images = value.substr(openBrace + 1, closeBrace - openBrace - 1)
                            .split(IMAGE_DELIMITER)

          declaration.value = 'url(' + getDefaultImage(images) + ')'

          rule.declarations.push({
            type: 'declaration',
            property: 'background-image',
            value: value
          })
        }
      })

      return rule
    })
  }
}

function getDefaultImage (images) {
  return images[0].trim().match(/'(.+?)'/)[0]
}
