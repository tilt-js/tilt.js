// socket input from the server
;(function(exports) {
  var Room = function(server) {
    var socket = io.connect(server);
    socket.on('notifyRoomID', function(connect) {
      self.roomID = id;
    });
    socket.on('notifyNewPlayer', function(index, name, score) {
      self.c.scores[index] = score;
      self.data.sharks[index] = {
        depth: 0,
        name: name,
        direction: 0,
        obj: self.c.entities.create(Shark, {
          center: {x: 100, y: 100},
          id: index,
          colorMatrix: SHARK_COLOR_MATRICES[index]
        })
      };
    });
    socket.on('chomp', function(index) {
      self.data.sharks[index].obj.chomp();

      // Get rid of intro on chomp
      var control = self.c.entities.all(Control)[0];
      control.next();
    });
    socket.on("dropPlayer",  function(index) {
      self.c.entities.destroy(self.data.sharks[index].obj);
    });
    socket.emit('joinRoom', 'computer');

    this.socket = socket;
  };

  Room.prototype = {
    on: function(event, callback) {

    }
  };

  exports.Tilt = exports.Tilt || {};
  exports.Tilt.Room = Room;
})(this);
