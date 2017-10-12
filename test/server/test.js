'use strict';

let assert = require('assert');
let messages = require('../../server/messages-util');

describe('Message', function() {
  it('should load the messages module', function() {
    assert.notEqual(null, messages);
  });
  it('should be able to add a new message and return id', function() {
    let message = {message: '1'};
    let id = messages.addMessage(message);
    assert.notEqual(null, id);
  });
  it('should return new messages', function() {
    let all = messages.getMessages(0);
    let newMessage = {message: '2'};
    messages.addMessage(newMessage);
    let newMessages = messages.getMessages(all.length);
    assert.deepEqual(newMessages, [newMessage]);
  });
  it('should be able to delete a message', function() {
    let message = {message: '3'};
    let id = messages.addMessage(message);
    messages.deleteMessage(id);
    assert.equal(null, messages.getMessages(0).find(m => m.id === id));
  });
});
