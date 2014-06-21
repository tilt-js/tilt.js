describe('Sock object', function() {
  var socket;
  var pong;
  var joinRoom;

  beforeEach(function() {
    mockSock = jasmine.createSpyObj('socket', ['emit', 'on']);
    io = {};
    io.connect = function() {
      return mockSock;
    };
    this.mockSock = mockSock;
  });

  afterEach(function() {
    io.connect = undefined;
  });

  it('should exist', function() {
    expect(window.Tilt.Sock).toBeDefined();
  });

  it('should connect and return a new sock object', function() {
    expect(window.Tilt.connect('10.0.0.1') instanceof window.Tilt.Sock).toBeTruthy();
  });

  describe('for games', function() {
    beforeEach(function() {
      this.s = window.Tilt.connect('10.0.0.1');
    });

    it('should send a join command', function() {
      expect(this.mockSock.emit).toHaveBeenCalledWith('join', 'computer');
    });

    it('should emit messages', function() {
      this.s.emit('cntID', 'msgname', 'argblah');
      expect(this.mockSock.emit).toHaveBeenCalledWith('msg', 'cntID', ['msgname', 'argblah']);
    });
  });

  describe('for controllers', function() {
    beforeEach(function() {
      this.s = window.Tilt.connect('10.0.0.1', 'gameidhere');
    });

    it('should send a join command', function() {
      expect(this.mockSock.emit).toHaveBeenCalledWith('join', 'controller', 'gameidhere');
    });
    it('should emit messages', function() {
      this.s.emit('msgname', 'argblah');
      expect(this.mockSock.emit).toHaveBeenCalledWith('msg', ['msgname', 'argblah']);
    });
  });
});