# mimeware [![Build Status](https://api.travis-ci.org/h2non/mimeware.svg?branch=master)][travis] [![Dependency Status](https://gemnasium.com/h2non/mimeware.svg)][gemnasium] [![NPM version](https://badge.fury.io/js/mimeware.svg)][npm]

Node.js/io.js HTTP server middleware to infer and define the proper MIME content type as response header

It is web framework agnostic and works properly in Connect, Express, Restify, Sails... among others
which implements the standard connect-based middleware interface: `use(function (req, res, next) { ... })`

It includes all 600+ types and 800+ extensions defined by the Apache project, plus additional types submitted by the node.js community. It uses [node-mime](https://github.com/broofa/node-mime)

It was implemented specially for older Express/Connect versions 
which has no smart support for content type discovering

## Installation

```bash
npm install mimeware --save
```

## Usage

```js
var express = require('express')
var mimeware = require('mimeware')
var app = express()

app.use(mimeware({ defaultType: 'text/html' }))

app.get('/hello', function (req, res, next) {
  // respond with default type: text/html
  res.send('Hello World!')
})

app.get('/hello.json', function (req, res, next) {
  // respond with type: application/json
  res.json({ say: 'Hello World!' })
})

app.get('/hello.xml', function (req, res, next) {
  // respond with type: text/xml
  res.send('<say>Hello World!</say>')
})
```

### Options

#### defaultType
Type: `string` Type: `text/html`

Define the default MIME type to use if cannot infer it

#### ignore
Type: `array<string|regex>`

An array of regex or string-like path patterns to ignore

#### defaultCharset
Type: `string` Default: `utf-8`

Define the default charset encoding type if cannot infer one.

#### charset
Type: `boolean` Default: `true`

Define the proper encoding charset if required

## License

[MIT](http://opensource.org/licenses/MIT) © Tomas Aparicio

[travis]: http://travis-ci.org/h2non/mimeware
[gemnasium]: https://gemnasium.com/h2non/mimeware
[npm]: http://npmjs.org/package/mimeware
