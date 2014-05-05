// socket input from the server
;(function(exports) {
	var connect = function(server, room_number) {
		if (room_number === undefined) {
			return new exports.Tilt.Room(server);
		} else {
			return new exports.Tilt.Game(server);
		}
	};

	exports.Tilt = exports.Tilt || {};
	exports.Tilt.connect = connect;
})(this);
