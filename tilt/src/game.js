// socket input from the server
;(function(exports) {
  var Game = function(server, roomid) {
    var socket = io.connect(server);
    socket.emit('joinRoom', 'controller', roomid);
    this.socket = socket;
    this.callbacks = {};
    this.socket.on('msg', function() {
      var a = arguments;
      var e = a.shift();
      if (this.callbacks[e] !== undefined) {
        this.callbacks[e].apply(this, a);
      }
    });
  };

  Room.prototype = {
    on: function(e, callback) {
      this.callbacks[e] = this.callbacks[e] || [];
      this.callbacks[e].push(callback);
      return this;
    },
    emit: function() {
      this.socket.emit.apply(this, arguments);
    },
    // off: function(e, callback) {
    //   this.callbacks[e] = this.callbacks[e] || [];
    //   this.callbacks[e].push(callback);
    //   return this;
    // }
  };

  exports.Tilt = exports.Tilt || {};
  exports.Tilt.Room = Room;
})(this);
