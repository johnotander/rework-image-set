var assert   = require('assert'),
    fs       = require('fs'),
    rework   = require('rework'),
    imageSet = require('..');

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim();
}

describe('rework-image-set', function() {
  it('parses the image-set property correctly', function() {
    var output = rework(fixture('basic.css')).use(imageSet()).toString().trim();
    var expected = fixture('basic.css.expected');

    assert.equal(output, expected);
  });
});
