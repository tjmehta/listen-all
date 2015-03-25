# listen-all
Listen to all of an EventEmitter's events

## Usage
```js
var EventEmitter = require('events').EventEmitter;
var listenAll = require('listen-all')

var emitter = new EventEmitter();

var stop = listenAll(emitter, function (event/*, data... */) {
  // ...do stuff...
  // data from #emit-start: arguments = 'start', { foo: 1 }
});

emitter.emit('start', { foo:1 }); // #emit-start

// call the returned function to stop listening to all events
stop();
```

## License
MIT
