# Rework Image Set

[![Build Status](https://travis-ci.org/johnotander/rework-image-set.svg?branch=master)](https://travis-ci.org/johnotander/rework-image-set)

This is a [Rework](https://github.com/reworkcss/rework) plugin to add future-proofed support for
[W3C-style image set](http://www.w3.org/TR/css4-images/) notation.

This will allow you to write the following CSS:

```css
.bg-img {
  background-image: image-set('my-img.png' 1x,
                              'my-img-2x.png' 2x,
                              'my-img-print.png' 600dpi);
}
```

And result in the following CSS, with an image fallback:

```css
.bg-img {
  background-image: url('my-img.png');
  background-image: image-set('my-img.png' 1x,
                              'my-img-2x.png' 2x,
                              'my-img-print.png' 600dpi);
}
```

_Note:_ This functionality currently requires CSS prefixing, I recommend using [autoprefixer](https://github.com/postcss/autoprefixer).

## Installation

```
npm install --save rework-image-set
```

## Usage

Proposed functionality for the Rework plugin:

```javascript
var fs       = require('fs'),
    rework   = require('rework'),
    imageSet = require('rework-image-set');

var css = fs.readFileSync('css/my-file.css', 'utf8').toString();
var out = rework(css).use(imageSet({})).toString();
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).
