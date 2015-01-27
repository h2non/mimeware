'use strict'

var mime = require('mime')
var merge = require('lodash.merge')

module.exports = mimeware

var defaults = {
  defaultType: 'text/html',
  charset: true
}

function mimeware(options) {
  options = merge({}, defaults, options)

  return function (req, res, next) {
    if (shouldDefineHeader(req, res)) {
      defineContentHeader(req, res)
    }
    next()
  }

  function defineContentHeader(req, res) {
    var type = mime.lookup(req.path, options.defaultType)
    res.setHeader('Content-Type', type + getCharset(type))
  }

  function getCharset(type) {
    var charset = mime.charsets.lookup(type)
    return options.charset && charset ? '; charset=' + charset : ''
  }

  function shouldDefineHeader(req, res) {
    return res.getHeader('content-type') == null
      && Array.isArray(options.ignore) ? shouldIgnore(req.path) : true
  }

  function shouldIgnore(path) {
    return options.ignore.filter(function (pattern) {
      pattern = typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern
      return pattern.test(path)
    }).length > 0
  }
}

