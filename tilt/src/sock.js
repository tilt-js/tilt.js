// socket input from the server
;(function(exports) {
  var Sock = function(server, roomid) {
    this.socket = io.connect(server);
    if (roomid === undefined) {
      this.socket.emit('joinRoom', 'computer');
      this.isGame = true;
      this.controllers = [];
      this.socket.on('notifyController', function(controllerID) {
        this.createController(controllerID);
      });
      this.socket.on('notifyControllerDisconnect', function(controllerID) {
        this.deleteController(controllerID);
      });
    } else {
      this.socket.emit('joinRoom', 'controller', roomid);
      this.isGame = false;
    }

    this.callbacks = {};

    this.socket.on('msg', function() {
      this.recieveMsg(arguments);
    });
  };

  Sock.prototype = {
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
    },
    createController: function(controllerID) {
      if (this.isGame === false) {
        console.log("Warning: createController was called, but this is a controller.");
        return false;
      }

      if (this.controllers.indexOf(controllerID) !== -1) {
        this.controllers.push(controllerID);
      }
    },
    deleteController: function(controllerID) {
      if (this.isGame === false) {
        console.log("Warning: createController was called, but this is a controller.");
        return false;
      }

      this.controllers = this.controllers.filter(function(item) {
        return item === controllerID;
      });
    }
  };

  exports.Tilt = exports.Tilt || {};
  exports.Tilt.Sock = Sock;
})(this);
