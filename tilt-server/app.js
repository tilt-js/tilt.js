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
    rooms[id] = socket;
}

function registerPlayerToRoom(room_id, socket) {
    players[socket_id] = room_id;
}

io.sockets.on('connection', function(socket) {
    socket.on('join', function (type, name, id) {
        console.log("connected");
        if (type === 'computer') {
            id = getRoomID();
            socket.join(id);
            registerComputerToRoom(id, socket);
            socket.emit('notifyRoomID', id);
        } else if (type === 'controller') {
            if (id in rooms) {
                socket.join(id);
                socket.emit("notifySuccess", "Joined room successfully.")
                registerPlayerToRoom(id, socket);
            } else {
                socket.emit('Error', 'Not a valid room.');
            }
        }
    });

    socket.on('msg', function (funcName) {
        args = ['msg', arguments[0], socket_id];
        arguments.shift();
        args.concat(arguments);
        socket.emit.apply(null, args);
    });

    socket.on('ping', function() {
        socket.emit('pong');
    });
});
