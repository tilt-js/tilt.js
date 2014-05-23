var io = require('socket.io-client')
, assert = require('assert');

describe('Testing Suite', function() {
    var socket;
    var pong;
    var joinRoom;
    var chatRoom;
    beforeEach(function(done) {
        // Setup
        socket = io.connect('http://localhost:9000', {
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
        });
        socket.on('connect', function() {
            console.log('worked...');
            done();
        });
        socket.on('disconnect', function() {
            console.log('disconnected...');
        });

        callbacks = {
            pong: function(){
                console.log('pong was called');
            },
            notifyRoomID: function(id) {
                console.log('joined room. Got id ' + id);
                chatRoom = id;
                socket.emit('join', 'controller', id);
            },
            notifySuccess: function() {
                console.log('controller joined room successfully');
            }
        };

        spyOn(callbacks, "pong");
        spyOn(callbacks, "notifyRoomID");
        spyOn(callbacks, "notifySuccess");
        socket.on("pong", callbacks.pong);
        socket.on("notifyRoomID", callbacks.notifyRoomID);
        socket.emit('ping');
        socket.emit('join', 'computer');

    });

    afterEach(function(done) {
        // Cleanup
        if(socket.socket.connected) {
            console.log('disconnecting...');
            socket.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();
    });

    describe('Checking connection', function() {
        it('Just checking basic connection', function(done) {
            expect(true).toBe(true);
            done();
        });

        it('Checking pong', function(done) {
            expect(callbacks.pong).wasCalled();
            done();
        });
        
        it('checking join room', function(done) {
            expect(callbacks.notifyRoomID).wasCalled();
            done();
        });

        it('checking controller joined', function(done) {
            expect(callbacks.no)
        });

    });

});