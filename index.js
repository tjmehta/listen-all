module.exports = listenAll;

function listenAll (emitter, handler) {
  var emit = emitter.emit;
  emitter.emit = function (event) {
    var args = Array.prototype.slice.call(arguments);
    this.once(event, handler.bind(this, event));
    return emit.apply(this, args);
  };
  return function stopListening () {
    emitter.emit = emit
  };
}