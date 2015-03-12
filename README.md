# listen-all
Listen to all of an EventEmitter's events

## Usage
```js
var EventEmitter = require('events').EventEmitter;
var listenAll = require('listen-all')

var emitter = new EventEmitter();

listenAll(emitter, function (event/*, data... */) {
  // ...do stuff...
  // data from emit-start: arguments = 'start', { foo: 1 }
});

emitter.emit('start', { foo:1 }); # emit-start
```

## License
MIT