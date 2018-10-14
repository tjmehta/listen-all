var EventEmitter = require('events').EventEmitter

var listenAll = require('../index.js')

describe('listen-all', function () {
  it('should allow listening to all events', function (done) {
    var ee = new EventEmitter()
    listenAll(ee, function (evt) {
      var args = Array.prototype.slice.call(arguments, 1)
      expect(args).toEqual([1,2,3])
      expect(evt).toEqual('hello')
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
      expect(args).toEqual([1,2,3])
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