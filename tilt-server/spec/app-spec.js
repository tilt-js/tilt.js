var io = require('socket.io-client')
, assert = require('assert')
, expect = require('expect.js');

describe('Suite of unit tests', function() {
    var socket;
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
        })

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
            expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
            done();
        });
    });

});