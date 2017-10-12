// this is a global variable. so we havn't declare it as a var
messages = {};

// the messages object have to store the messages, so i declared a messages array to hold all the messages, 
// and a message Id unique to each message in the array
var currentMessages = [];
var currentId = 1;
var shownMessages = 0;

/// message:Object, insert a new message to the store and return a number that is the id of the new added message
messages.addMessage = function(message){
    var id = currentId;
    message.id = currentId++;
    // inorder to change the date format, i have implemented a function to change the date format in the end
    message.timestamp = getTheDateFormat();
    message.deleted = 0;
    
    currentMessages.push(message);
    shownMessages++;
    return id;
};

/// counter:number, return an array of messages that have id more that the given number
messages.getMessages = function(counter){
    
    var wantedMessages = [];
    for(var i=counter; i<currentMessages.length; i++){
      if(currentMessages[i].deleted == 0)
        wantedMessages.push(currentMessages[i]);
    }
    
    return wantedMessages;
};

/// id:String, delete the a message from the store that have the given id
messages.deleteMessage = function(id){
    
    for(var i=0; i<currentMessages.length; i++){
        if(currentMessages[i].id == id){
            
            currentMessages[i].deleted = 1;
            shownMessages--;
        }
    }


};

/// this function return the number of the messages in the store, 
/// we need this function to know the get stats of the chat room
messages.getCurrentMessagesLength = function(){
    
    return shownMessages;
};

// function that return the current date in a readable format 
// based on: https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript
getTheDateFormat = function(){
    var d = new Date,
    dformat = [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    if(h < '10'){
        h = '0'+h;
    }
    if(m < '10'){
        m = '0'+m;
    }
    if(s < '10'){
        s = '0'+s;
    }

    var dd = new Date,
    dformatt = [h,
                m,
                s].join(':');

    return dformatt;
};

// inorder to have access to the messages variable and his function, we have to export it from this file
module.exports = messages;