var EventEmitter = require('events').EventEmitter

var Code = require('code')
var Lab = require('lab')

var listenAll = require('../index.js')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var before = lab.before
var after = lab.after
var expect = Code.expect

describe('listen-all', function () {
  it('should allow listening to all events', function (done) {
    var ee = new EventEmitter()
    listenAll(ee, function (evt) {
      var args = Array.prototype.slice.call(arguments, 1)
      expect(args).to.deep.equal([1,2,3])
      expect(evt).to.equal('hello')
      done()
    })
    ee.emit('hello', 1, 2, 3)
  })
  it('should not affect normal usage', function(done) {
    var ee = new EventEmitter()
    listenAll(ee, function () {
      // noop
    })
    ee.on('hello', function () {
      var args = Array.prototype.slice.call(arguments)
      expect(args).to.deep.equal([1,2,3])
      done()
    })
    ee.emit('hello', 1, 2, 3)
  })
  it('should allow listening to all events', function (done) {
    var ee = new EventEmitter()
    var stop = listenAll(ee, function (evt) {
      done(new Error('should not happen'))
    })
    stop()
    ee.emit('hello', 1, 2, 3)
    done()
  })
})