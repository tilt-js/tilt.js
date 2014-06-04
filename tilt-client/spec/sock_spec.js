describe('Sock object', function() {
  var socket;
  var pong;
  var joinRoom;
  beforeEach(function() {
  });

  afterEach(function() {
  });

  it('should exist', function() {
    expect(window.Tilt.Sock).toBeDefined();
  });

  it('should connect and return a new sock object', function() {
    expect(window.Tilt.connect('10.0.0.1') instanceof window.Tilt.Sock).toBeTruthy();
  });

  describe('for games', function() {
    it('should emit messages', function() {
      var s = window.Tilt.connect('10.0.0.1');

      s.emit('cntID', 'msgname', 'argblah');
      var emits = io.mockGetFunctionCalls('emit');
      expect(emits[emits.length - 1]).toEqual(['msg', 'cntID', ['msgname', 'argblah']]);
    });
  });

  describe('for controllers', function() {
    it('should emit messages', function() {
      var s = window.Tilt.connect('10.0.0.1', 'gameidhere');

      s.emit('msgname', 'argblah');
      var emits = io.mockGetFunctionCalls('emit');
      expect(emits[emits.length - 1]).toEqual(['msg', ['msgname', 'argblah']]);
    });
  });
});