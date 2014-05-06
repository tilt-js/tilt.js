// socket input from the server
;(function(exports) {
  var Controller = function(sock) {
    this.sock = sock;
  };

  Controller.prototype = {
    on: function(e, callback) {
      this.callbacks[e] = this.callbacks[e] || [];
      this.callbacks[e].push(callback);
      return this;
    },
    off: function(e, callback) {
      this.callbacks[e] = this.callbacks[e] || [];
      this.callbacks[e] = this.callbacks[e].filter(function(item) {
        return item === callback;
      });

      return this;
    },
    send: function() {
      var a = arguments;
      a.unshift('msg');
      this.socket.emit.apply(null, arguments);

      return this;
    },
    // INTERNAL FUNCTIONS
    receiveMsg: function(args) {
      var e = args.shift();
      if (this.callbacks[e] !== undefined) {
        for (var i in this.callbacks[e]) {
          this.callbacks[e][i].apply(this, args);
        }
      }
    }
  };

  exports.Tilt = exports.Tilt || {};
  exports.Tilt.Sock = Sock;
})(this);
