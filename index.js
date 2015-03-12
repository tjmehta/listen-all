'use strict';

module.exports = listenAll;

function listenAll (emitter, handler) {
  var emit = emitter.emit;
  var handlerMap = {};
  emitter.emit = function (event) {
    var args = Array.prototype.slice.call(arguments);
    this.once(event, handler);
    handlerMap[event] = handler;
    args.unshift(event);
    return emit.apply(this, args);
  };
  return function stopListening () {
    Object.keys(handlerMap).forEach(function (key) {
      var handler = handlerMap[key];
      emitter.removeListener(key, handler);
    });
  };
}