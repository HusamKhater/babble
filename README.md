# babble
front end project, creating responsive chat application using NodeJS server

Functionality
  ● Web-based responsive chat
  ● One room
  ● Content open to everyone
  ● User can type a new message and submit to room
  ● New messages appear at the bottom
  ● User can delete his own messages
  ● User is defined by email address
  ● Avatars should be displayed automatically for email address
  ● First load should display a modal popup to collect email address
  ● User can discard and continue as anonymous
  ● Non-persistent (no db - all messages erased after server restart)
  ● Client-side persistence:
    ○ Typed text in new message textarea
    ○ Email address / preference to be anonymous
  ● Chat-room stats:
    ○ Number of connected users
    ○ Number of messages

Implementation
  ● Server in NodeJS
  ● Real-time updates with long polling: http://book.mixu.net/node/ch3.html
  ● Automatic avatars with Gravatar: https://en.gravatar.com/site/implement/profiles/json/
  ● Client-side persistence with LocalStorage:
    https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    ○ exact (one) LocaStorage key: babble with these properties
      ■ currentMessage:String
      ■ userInfo:Object
        ● name:String
        ● email:String
  ● No JS libraries (e.g. jQuery, Angular, etc.)
  ● No CSS frameworks (e.g. Bootstrap, etc.)
  ● No IDs should be used for CSS styling
  ● Exactly one JS global variable allowed: Babble
  ● All class names should adhere to the SUIT CSS naming convention
  
Client API
  ● You should implement these methods:
  ● Babble.register(userInfo:Object)
  ● Babble.getMessages(counter:Number, callback:Function)
  ● Babble.postMessage(message:Object, callback:Function)
  ● Babble.deleteMessage(id:String, callback:Function)
  ● Babble.getStats(callback:Function)
  ● See unit tests for more info
Server API
  ● You should implement a module to handle messages: server/messages-util.js
  ● messages.addMessage(message:Object) : Number(id)
  ● messages.getMessages(counter:Number) : Array(messages)
  ● messages. deleteMessage(id:String)
  ● You should use this module in your server code to separate concerns from the
    client-server API handling logic in server/main.js
  
Standards and Validation
  ● HTML5 doctype + UTF8 charset
  ● Valid HTML5 (zero errors: https://validator.w3.org/ )
  ● Accessible (zero errors: http://wave.webaim.org/ )
  ● Logical heading structure (zero outline orphans: https://validator.w3.org/ (show outline))
  ● No JS errors (DevTools console) ( without global onerror handler)
  ● Should pass all unit tests - see relevant section
  ● 80/100 or higher Google PageSpeed score
    ( https://developers.google.com/speed/pagespeed/insights/ )
  ● Mobile optimized
    ○ Viewport meta tag present with width=device-width
      ( https://developer.mozilla.org/en/docs/Mozilla/Mobile/Viewport_meta_tag )
    ○ Initial scale 100% (no automatic zoom out)
    ○ Don’t disable pinch zoom
    ○ No horizontal scroll on any screen size  
