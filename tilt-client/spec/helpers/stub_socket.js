// socket input from the server
;(function(exports) {
  var io = function(server, roomid) {
  };

  var calls = [];

  io = {
    connect: function(server) {
      calls = [];
      return this.socket;
    },
    socket: {
      emit: function() {
        calls.push(['emit', Array.prototype.slice.call(arguments)]);
      },
      on: function() {
        calls.push(['on', Array.prototype.slice.call(arguments)]);
      }
    },
    // returns an array of function call arguments for the function call
    // with the specified name
    mockGetFunctionCalls: function(name) {
      var namedCalls = [];
      for (var c in calls) {
        if (calls[c][0] === name) {
          namedCalls.push(calls[c][1]);
        }
      }
      return namedCalls;
    }
  };

  exports.io = io;
})(this);
