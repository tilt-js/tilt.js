// socket input from the server
;(function(exports) {
  var Sock = function(server, roomid) {
    this.socket = io.connect(server);
    var self = this;
    if (roomid === undefined) {
      this.isGame = true;
      this.roomID = false;
      this.controllers = [];
      this.socket.on('notifyController', function(controllerID) {
        self.createController(controllerID);
      });
      this.socket.on('notifyControllerDisconnect', function(controllerID) {
        self.deleteController(controllerID);
      });
      this.socket.on('notifyRoomID', function(roomid) {
        self.roomID = roomid;
      });
      this.socket.emit('join', 'computer');
    } else {
      this.socket.emit('join', 'controller', roomid);
      this.isGame = false;
      this.roomID = roomid;
    }

    this.socket.on('notifySuccess', function() {
      console.log("success!");
    });

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
    emit: function() {
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

      if (this.controllers.indexOf(controllerID) === -1) {
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
