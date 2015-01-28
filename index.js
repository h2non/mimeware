'use strict'

var mime = require('mime')
var ext = require('path').extname
var merge = require('lodash.merge')

module.exports = mimeware

var defaults = {
  defaultType: 'text/html',
  defaultCharset: 'utf-8',
  charset: true
}

function mimeware(options) {
  options = merge({}, defaults, options)

  return function (req, res, next) {
    var path = req.path
    if (shouldDefineHeader(path, res)) {
      res.setHeader('Content-Type', getContentType(path, res))
    }
    next()
  }

  function getContentType(path, res) {
    if (ext(path).length > 0) {
      return lookupContentHeader(path)
    } else {
      return getDefaultType()
    }
  }

  function lookupContentHeader(path) {
    var type = mime.lookup(path, options.defaultType)
    return type + getCharset(type)
  }

  function getCharset(type) {
    var charset = mime.charsets.lookup(type)
    return options.charset && charset ? '; charset=' + charset : ''
  }

  function shouldDefineHeader(path, res) {
    return res.getHeader('content-type') == null
      && Array.isArray(options.ignore) ? shouldIgnore(path) : true
  }

  function shouldIgnore(path) {
    return options.ignore.filter(function (pattern) {
      pattern = typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern
      return pattern.test(path)
    }).length > 0
  }

  function getDefaultType() {
    return options.defaultType +
      (options.charset ? '; charset=' + options.defaultCharset : '')
  }
}

