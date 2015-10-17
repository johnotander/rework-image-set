import test from 'ava'
import fs from 'fs'
import rework from 'rework'
import imageSet from '../'

test('parses the image-set property correctly', t => {
  var output = rework(fixture('basic.css')).use(imageSet()).toString().trim()
  var expected = fixture('basic.expected.css')

  t.same(output, expected)
  t.end()
})

test('converts double quotes to single quotes', t => {
  var output = rework(fixture('quotes.css')).use(imageSet()).toString().trim()
  var expected = fixture('quotes.expected.css')

  t.same(output, expected)
  t.end()
})

function fixture (name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim()
}
