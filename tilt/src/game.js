// socket input from the server
;(function(exports) {
  var Game = function(server, roomid) {
    var socket = io.connect(server);
    socket.emit('joinRoom', 'controller', roomid);
    this.socket = socket;
    this.callbacks = {};
  };

  Room.prototype = {
    on: function(event, callback) {

    }
  };

  exports.Tilt = exports.Tilt || {};
  exports.Tilt.Room = Room;
})(this);
