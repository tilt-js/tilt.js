var io = require('socket.io').listen(9000);

// Init variables
var computer = {};
var players = {};
var rooms = {};

var generateSessionId = (function() {
    var chars = '34789abcdefhjkmnpqrtuvwxy';
    var charLength = chars.length;

    return function(length) {
        var result = '';
        while (length--)
            result += chars[Math.floor(Math.random() * charLength)];
        return result;
    };
})();

function getRoomID() {
    do {
        var id = generateSessionId(3);
    } while (rooms[id]);
    return id.toUpperCase();
}

function registerComputerToRoom(id, socket) {
    rooms[id] = {computer: socket, players: {}};
}

function registerPlayerToRoom(room_id, socket) {
    rooms[room_id].players[socket.id] = socket.id;
    players[socket.id] = {player: socket, room: rooms[room_id].computer};
}

io.sockets.on('connection', function(socket) {
    socket.on('join', function (type, id) {
        console.log("connected");
        if (type === 'computer') {
            id = getRoomID();
            registerComputerToRoom(id, socket);
            socket.emit('notifyRoomID', id);
            socket.type = 'computer';
            socket.room_id = id
        } else if (type === 'controller') {
            if (rooms[id]) {
                room_sock = rooms[id].computer;
                socket.join(id);
                registerPlayerToRoom(id, socket);
                socket.emit("notifySuccess", "Joined room successfully.");
                room_sock.emit("notifyController", socket.id);
                socket.type = 'controller';
            } else {
                socket.emit('error', 'Not a valid room.');
            }
        }
    });

    socket.on('msg', function () {
        if (socket.type === 'computer') {
            controller_id = arguments[0];
            if (controller_id == 'all') {
                socket.broadcast.to(socket.room_id).emit('msg', arguments[1]);
            } else if (controller_id in players) {
                player_sock = players[controller_id].player;
                if (player_sock) {
                    player_sock.emit('msg', arguments[1]);
                } else {
                    socket.emit("error", "Player socket is no longer valid");
                }
            } else {
                socket.emit('error', 'Not valid controller id.');
            }
        } else if (socket.type === 'controller') {
            room_socket = players[socket.id].room;
            room_socket.emit('msg', socket.id, arguments[0]);
        } else {
            socket.emit("error", "Bad msg format");
        }
    });

    socket.on('ping', function() {
        socket.emit('pong');
    });
});
