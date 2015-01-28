var mimeware = require('../')
var request = require('request')
var expect = require('chai').expect
var express = require('express')

suite('mimewire', function () {

  function fakeResponse(req, res) {
    res.send('hello world')
  }

  suite('express', function () {
    var server, app = express()

    before(function (done) {
      app.use(mimeware())
      app.get('/test.html', fakeResponse)
      app.get('/test.js', fakeResponse)
      app.get('/test.css', fakeResponse)
      app.get('/test.png', fakeResponse)
      app.get('/test', fakeResponse)
      app.get('/', fakeResponse)
      server = app.listen(8888, done)
    })

    test('respond with a default content type', function (done) {
      request('http://localhost:8888', function (err, res) {
        expect(res.headers['content-type']).to.be.equal('text/html; charset=utf-8')
        done()
      })
    })

    test('respond with proper javascript type', function (done) {
      request('http://localhost:8888/test.js', function (err, res) {
        expect(res.headers['content-type']).to.be.equal('application/javascript')
        done()
      })
    })

    test('respond with proper css type', function (done) {
      request('http://localhost:8888/test.css', function (err, res) {
        expect(res.headers['content-type']).to.be.equal('text/css; charset=UTF-8')
        done()
      })
    })

    test('respond with proper image type', function (done) {
      request('http://localhost:8888/test.png', function (err, res) {
        expect(res.headers['content-type']).to.be.equal('image/png')
        done()
      })
    })

    test('close the server', function () {
      server.close()
    })
  })

  suite('options', function () {
    var server, app = express()

    before(function (done) {
      app.use(mimeware({ defaultType: 'application/json', charset: false }))
      app.get('/test.html', fakeResponse)
      app.get('/test.json', fakeResponse)
      app.get('/test', fakeResponse)
      app.get('/', fakeResponse)
      server = app.listen(8889, done)
    })

    test('respond with a default content type', function (done) {
      request('http://localhost:8889', function (err, res) {
        expect(res.headers['content-type']).to.be.equal('application/json')
        done()
      })
    })

    test('respond with a default content type', function (done) {
      request('http://localhost:8889/test', function (err, res) {
        expect(res.headers['content-type']).to.be.equal('application/json')
        done()
      })
    })

    test('respond with proper json content type', function (done) {
      request('http://localhost:8889/test.json', function (err, res) {
        expect(res.headers['content-type']).to.be.equal('application/json')
        done()
      })
    })

    test('respond with proper html type', function (done) {
      request('http://localhost:8889/test.html', function (err, res) {
        expect(res.headers['content-type']).to.be.equal('text/html')
        done()
      })
    })

    test('close the server', function () {
      server.close()
    })
  })
})
