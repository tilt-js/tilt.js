module.exports = {
	getRoomID: function(rooms) {
		var randomStr = "";
		var len = 6;
		var tokens = "abcdefghijklmnopqrstuvwxyz0123456789";

		do {
			for (var i = 0; i < len; i++) {
				randomStr += tokens.charAt(Math.floor(Math.random() * tokens.length));
			}
		} while (rooms[randomStr] !== undefined) 

		return randomStr;	
	}
}