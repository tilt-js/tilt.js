;(function(exports) {
  var Controller = function(sock, id) {
    this.sock = sock;
    this.id = id;
  };

  Controller.prototype = {
    // INTERNAL FUNCTIONS
    receiveSet: function(key, value) {
      this[key] = value;
      this.sock.recieveMsg(this.id, [key + 'Updated', value]);
    }
  };

  exports.Tilt = exports.Tilt || {};
  exports.Tilt.Controller = Controller;
})(this);
