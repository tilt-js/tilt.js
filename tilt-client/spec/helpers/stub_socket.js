// socket input from the server
;(function(exports) {
  var io = function(server, roomid) {
  };

  io.prototype = {
    connect: function() {
      return this.socket;
    },
    socket: {
      
    }
  };

  exports.io = io;
})(this);
