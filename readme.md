# rework-image-set [![Build Status](https://travis-ci.org/johnotander/rework-image-set.svg?branch=master)](https://travis-ci.org/johnotander/rework-image-set) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

[Rework](https://github.com/reworkcss/rework) plugin to add future-proofed support for
[W3C-style image set](http://www.w3.org/TR/css4-images/) notation. This provides a `backround-image`
fallback for browsers that don't support `image-set`.

## Installation

```
npm install --save rework-image-set
```

## Usage

```javascript
var fs = require('fs')
var rework = require('rework')
var imageSet = require('rework-image-set')

var css = fs.readFileSync('css/my-file.css', 'utf8').toString()
var out = rework(css).use(imageSet()).toString()
```

### Input

```css
.bg-img {
  background-image: image-set('my-img.png' 1x,
                              'my-img-2x.png' 2x,
                              'my-img-print.png' 600dpi);
}
```

### Output

```css
.bg-img {
  background-image: url('my-img.png');
  background-image: image-set('my-img.png' 1x,
                              'my-img-2x.png' 2x,
                              'my-img-print.png' 600dpi);
}
```

_Note:_ This functionality currently requires CSS prefixing, it's recommended to use
[autoprefixer](https://github.com/postcss/autoprefixer).

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).
