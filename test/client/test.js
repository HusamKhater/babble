'use strict';

let assert = window.chai.assert;
let sinon = window.sinon;
let Babble = window.Babble;

describe('LocalStorage', function() {
  it('should have one key named babble in json format', function() {
    let keys = Object.keys(localStorage);
    assert.equal(keys.length, 1);
    assert.deepEqual(keys, ['babble']);

    let data = localStorage.getItem('babble');
    assert.doesNotThrow(JSON.parse.bind(JSON, data));
  });
  it('should have mandatory keys', function() {
    let data = JSON.parse(localStorage.getItem('babble'));
    assert.exists(data.userInfo);
    assert.exists(data.currentMessage);
    assert.exists(data.userInfo.name);
    assert.exists(data.userInfo.email);
  });
});


describe('User state', function() {
  let originalValue;
  before(function() {
    originalValue = localStorage.getItem('babble');
  });
  after(function() {
    localStorage.setItem('babble', originalValue);
  });
  it('should be empty before registering', function() {
    let data = JSON.parse(localStorage.getItem('babble'));
    assert.isEmpty(data.userInfo.name);
    assert.isEmpty(data.userInfo.email);
  });
  it('should have details after register', function() {
    Babble.register({
      name: 'Alex Krul',
      email: 'alex@krul.co.il'
    });
    let data = JSON.parse(localStorage.getItem('babble'));
    assert.equal(data.userInfo.name, 'Alex Krul');
    assert.equal(data.userInfo.email, 'alex@krul.co.il');
  });
  it('should allow anonymous register', function() {
    Babble.register({
      name: '',
      email: ''
    });
    let data = JSON.parse(localStorage.getItem('babble'));
    assert.empty(data.userInfo.name);
    assert.empty(data.userInfo.email);
  });
});

describe('Client-Server', function() {
  let server, apiUrl;

  before(function() {
    apiUrl = 'http://localhost:9000';
    server = sinon.fakeServer.create();
  });
  beforeEach(function() {
    server.requests.length = 0;
  });
  after(function() {
    server.restore();
  });

  describe('API', function() {
    it('should issue GET /messages ', function() {
      server.respondWith('GET', `${apiUrl}/messages?counter=0`, JSON.stringify([]));
      let callback = sinon.spy();
      Babble.getMessages(0, callback);
      server.respond();
      sinon.assert.calledWith(callback, []);
    });
    it('should issue POST /messages ', function() {
      server.respondWith('POST', `${apiUrl}/messages`, JSON.stringify({id: '42'}));
      let callback = sinon.spy();
      let message = {
        name: 'Alex Krul',
        email: 'alex@krul.co.il',
        message: 'Hi from mocha',
        timestamp: Date.now()
      };
      Babble.postMessage(message, callback);
      server.respond();
      assert.equal(server.requests[0].requestBody, JSON.stringify(message));
      sinon.assert.calledWith(callback, {id: '42'});
    });
    it('should issue DELETE /messages/:id ', function() {
      server.respondWith('DELETE', `${apiUrl}/messages/42`, JSON.stringify(true));
      let callback = sinon.spy();
      Babble.deleteMessage('42', callback);
      server.respond();
      sinon.assert.calledWith(callback, true);
    });
    it('should issue GET /stats ', function() {
      server.respondWith('GET', `${apiUrl}/stats`, JSON.stringify({users: 5, messages: 20}));
      let callback = sinon.spy();
      Babble.getStats(callback);
      server.respond();
      sinon.assert.calledWith(callback, {users: 5, messages: 20});
    });
  });
});
