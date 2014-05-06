// socket input from the server
;(function(exports) {
	var connect = function(server, room_number) {
		if (room_number === undefined) {
			return new exports.Tilt.Sock(server);
		} else {
			return new exports.Tilt.Sock(server, room_number);
		}
	};

	exports.Tilt = exports.Tilt || {};
	exports.Tilt.connect = connect;
})(this);
