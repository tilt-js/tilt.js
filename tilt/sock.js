// socket input from the server
;(function(exports) {
	var Sock = function(game) {
		var self = this;
		this.c = game.c;
		this.roomID = null;
		this.data = {sharks: []};
		var socket = io.connect('http://surf.rl.io:9000');
		socket.on('notifyRoomID', function(id) {
			self.roomID = id;
		});
		socket.on('updateDepth', function(index, depth) {
			self.data.sharks[index].depth = depth;
		});
		socket.on('updateDirection', function(index, dir) {
			self.data.sharks[index].direction = dir;
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

		window.onkeydown = function(e) {
			var shark = self.data.sharks[0];
			switch(e.which) {
				case 38:
					shark.depth = -1;
					break;
				case 40:
					shark.depth = 1;
					break;
				case 37:
					shark.direction = -1;
					break;
				case 39:
					shark.direction = 1;
					break;
				case 32:
					shark.obj.chomp();
					break;
				case 83:
					var index = self.data.sharks.length;
					self.data.sharks[index] = {
						name: "MOCK",
						depth: 0,
						direction: 0,
						obj: self.c.entities.create(Shark, {
							center: {x: 100, y: 100},
							id: index,
							colorMatrix: SHARK_COLOR_MATRICES[index]
						})
					};
					break;
			}
		};
		window.onkeyup = function(e) {
			var shark = self.data.sharks[0];
			switch(e.which) {
				case 38:
				case 40:
					shark.depth = 0;
					break;
				case 37:
				case 39:
					shark.direction = 0;
					break;
			}
		};
	};

	Sock.prototype = {
		getSharkData: function(sharkID) {
			return this.data.sharks[sharkID];
		},
		gameStarted: false,
		scoreChange: function(shark){
			this.socket.emit("updateScore",
				shark.id,
				this.c.scores[shark.id]
			);
		},
		notifyDeath: function(sharkId) {
			this.socket.emit("notifyDeath",
				sharkId
			);
		},
		notifyGameOver: function() {
			this.socket.emit("notifyGameOver");
		},
		notifyVictory: function(sharkIds) {
			this.socket.emit("notifyVictory",
				sharkIds
			);
		}
	};
	exports.Sock = Sock;
})(window);
