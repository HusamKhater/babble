window.Babble = {

    register : function(userInfo){
        
    
        var localSt = JSON.parse(localStorage.getItem('babble'));
        if(!localSt){
            var babble = {
                currentMessage:"",
                userInfo: {
                    name: userInfo.name,
                    email: userInfo.email
                }
            }
            localStorage.setItem('babble', JSON.stringify(babble));
        }else{
            localSt.userInfo = {
                name: userInfo.name,
                email: userInfo.email
            };
            localStorage.setItem('babble', JSON.stringify(localSt));
        }
    
        document.getElementById("messageContent").classList.remove("hidden");
        document.getElementById("submitButton").classList.remove("hidden");
        var localSt1 = JSON.parse(localStorage.getItem('babble'));
        document.getElementById('messageContent').value = localSt1.currentMessage;
        Babble.notifyLogin();
        Babble.getStats(changeTheStats);
        Babble.getMessages(Babble.theCurrentMessagesNumber,displayTheMessages);
    
    },

    notifyLogin: function(){
        
        
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:9000/login');
            xhr.addEventListener('load', function(e){
                var data = JSON.parse(e.target.responseText);
                
                var numOfUsers = data.users;
                var numOfMsgs = data.messages;
                changeTheStats(data);
            });
            xhr.addEventListener('error', function(e){
                console.log('ERROR while loging in');    
            });
            xhr.send();
        
    },

    getStats: function(callback){
        var xhr = new XMLHttpRequest();
        
        xhr.open('GET', 'http://localhost:9000/stats');
    
        xhr.addEventListener('load', function(e){
            
            if(xhr.status == 200 && xhr.readyState == 4){ // taken from w3school ajax_xmlhttprequest_response
            
                var data = JSON.parse(e.target.responseText);
                
                
                if(callback){
                    callback(data);
                }
                
                        
            }else{
                // something went wrong !!
                console.log('we have an error in the getMessage function with status ' + xhr.status);
            }
    
        });
    
        xhr.addEventListener('error', function(e){
            console.log('ERROR while getting the stats of the chat');
        });
    
        xhr.send();
    
    },

    getMessages: function(counter, callback){
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:9000/messages?counter=' +  counter, true);
        
        xhr.addEventListener('load', function(e){
            if(xhr.status == 200 && xhr.readyState == 4){ // taken from w3school ajax_xmlhttprequest_response
                
                //var data = JSON.parse(e.target.responseText);
                //var array = data.array;
                
                
                if(callback){
                    callback(JSON.parse(e.target.responseText));
                }

            }else{
                console.log('we have an error in the getMessage function with status ' + xhr.status);
            }
        });
    
        xhr.addEventListener('error', function(e){
            console.log('ERROR while getting the messages');
        });
    
        xhr.send();
    
    },

    deleteMessage : function(id, callback){
        
            var xhr = new XMLHttpRequest();
            xhr.open('DELETE', 'http://localhost:9000/messages/' + id);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.addEventListener('load', function(e){
                if(callback){
                    callback(JSON.parse(e.target.responseText));
                }
        
            });
        
            xhr.addEventListener('error', function(e){
                console.log('ERROR while deleting the message');
            });
        
            xhr.send();
    },

    postMessage: function(message, callback){
        
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:9000/messages');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
            xhr.addEventListener('load', function(e){
                if(xhr.status == 200 && xhr.readyState == 4){ // taken from w3school ajax_xmlhttprequest_response
                    var data = JSON.parse(e.target.responseText);
                    if(callback){
                        callback(data);
                    }
                }else{
                    // something went wrong !!
                    console.log('we have an error in the postMessage function with status ' + xhr.status);
                }
            });
        
            xhr.addEventListener('error', function(e){
                console.log('ERROR while posting the message');
            });
        
            xhr.send(JSON.stringify(message));
    },

    notifyLogout: function(){
        
        var localSt = JSON.parse(localStorage.getItem('babble'));
        localSt.currentMessage = document.getElementById('messageContent').value;
        localStorage.setItem('babble', JSON.stringify(localSt));
    
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:9000/logout');
        xhr.addEventListener('load', function(e){
            console.log('Bye Bye .. ');
        });
        xhr.addEventListener('error', function(e){
            console.log('ERROR while loging out');   
        });
        xhr.send();
    
    }
        

};



/// babble object, we can see that babble isn't a var declared variable, so he is a global variable
Babble.theCurrentMessagesNumber = 0;

window.addEventListener('load',onload);

function onload(){
    var localSt = JSON.parse(localStorage.getItem("babble"));
    
    if(localSt == null){

        var temp = {
            currentMessage: '',
            userInfo:{
                name: '',
                email: ''
            }
        };

        localStorage.setItem('babble', JSON.stringify(temp));

        document.getElementById("messageContent").classList.add("hidden");
        document.getElementById("submitButton").classList.add("hidden");

    
    }else{

        var name = JSON.parse(localStorage.getItem("babble")).userInfo.name;
        if(name !=null){

            document.getElementById("registBox").classList.add("hidden");
            document.getElementById("messageContent").classList.remove("hidden");
            document.getElementById("submitButton").classList.remove("hidden");

        }
        
        Babble.theCurrentMessagesNumber = 0;
        document.getElementById('messageContent').value = localSt.currentMessage;
        Babble.notifyLogin();
        Babble.getStats(changeTheStats);
        Babble.getMessages(Babble.theCurrentMessagesNumber,displayTheMessages);
    
    }

}

// taken from https://stackoverflow.com/questions/9626059/window-onbeforeunload-in-chrome-what-is-the-most-recent-fix
window.addEventListener('beforeunload', function(){ 
    var x = Babble.notifyLogout();
    return x;
});

///// based on: https://stackoverflow.com/questions/7745741/auto-expanding-textarea
// var textarea = document.getElementById("messageContent");
// var growable = document.querySelector('.js-growable');
// var heightLimit = 300; /* Maximum height: 200px */

document.getElementById("messageContent").addEventListener('input', function(){
    document.getElementById("messageContent").style.height = ""; /* Reset the height*/
    document.getElementById("messageContent").style.height = Math.min(document.getElementById("messageContent").scrollHeight, 300) + "px";  
});

// textarea.oninput = function() {
//   textarea.style.height = ""; /* Reset the height*/
//   textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
  
// };

function show(obj){
    
    var localSt = JSON.parse(localStorage.getItem("babble"));
    obj.getElementsByTagName('div')[0].style.backgroundColor = '#ededed';
    if(localSt)
        if(obj.getElementsByTagName('span')[0].innerText == localSt.userInfo.email && localSt.userInfo.email != ''){
            obj.getElementsByTagName('button')[0].classList.remove("hidden");
            obj.getElementsByTagName('button')[0].style.backgroundColor = '#ededed';
        }
}

function hide(obj){
    obj.getElementsByTagName('button')[0].classList.add("hidden");
    obj.getElementsByTagName('div')[0].style.backgroundColor = 'white';
    obj.getElementsByTagName('button')[0].style.backgroundColor = 'white';
}


// listener to the save button, takes the name and the email values and save them in the localstorage if needed
document.getElementById('saveButton').addEventListener('click', function(){


    var fullname = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    if(fullname&&email){
        var userInfo = {
            name: fullname,
            email:email
        }
        Babble.register(userInfo);
        document.getElementById("registBox").classList.add("hidden");
    }
});

// listener to the Anonymous button, stores a default value in the userinfo 
document.getElementById('anonymousButton').addEventListener('click', function(){
    var userInfo = {
        name: '',
        email:''
    }
    Babble.register(userInfo);
    document.getElementById("registBox").classList.add("hidden");
});

// listener that stores the current written message in the localstorage, we store onchange not oninput because that improve the performance
document.getElementById('messageContent').addEventListener('change', function(){
   

    var messageContent = document.getElementById('messageContent').value;
    

    var localSt = JSON.parse(localStorage.getItem('babble'));
    localSt.currentMessage = messageContent;
    localStorage.setItem('babble', JSON.stringify(localSt));
});

// listenr on enter click to submit 
//based on : https://stackoverflow.com/questions/14542062/eventlistener-enter-key
document.addEventListener('keypress', function(e){
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        var theContent = document.getElementById('messageContent').value;
        // the user cant send empty message !!
        if(!theContent.match(/^[\n\s]*$/) && theContent.length >0){
    
            var localSt = JSON.parse(localStorage.getItem('babble'));
            var theName = localSt.userInfo.name;
            var theMail = localSt.userInfo.email;
    
            Babble.postMessage({name:theName, email: theMail, timestamp: (Date.now()), message: theContent});
            
            localSt.currentMessage = '';
            localStorage.setItem('babble', JSON.stringify(localSt));
            setTimeout(function(){
                document.getElementById('messageContent').value = '';
                document.getElementById('messageContent').style.height = "";
            }, 10);
            
    
        }
    }
});

// listener that submit the written message to the server
document.getElementById('submitButton').addEventListener('mousedown', function(){
    
    
    var theContent = document.getElementById('messageContent').value;
    // the user cant send empty message !!
    if(!theContent.match(/^[\n\s]*$/) && theContent.length >0){

        var localSt = JSON.parse(localStorage.getItem('babble'));
        var theName = localSt.userInfo.name;
        var theMail = localSt.userInfo.email;

        Babble.postMessage({name:theName, email: theMail, timestamp: (Date.now()), message: theContent});
        
        localSt.currentMessage = '';
        localStorage.setItem('babble', JSON.stringify(localSt));
        setTimeout(function(){
            document.getElementById('messageContent').value = '';
            document.getElementById('messageContent').style.height = "";
        }, 10);

    }
});


function deleteFunc(obj){
   
    var theEmail = obj.parentElement.getElementsByTagName('span')[0].innerText;
    
    if(theEmail == JSON.parse(localStorage.getItem('babble')).userInfo.email){

        var theDeletedId = obj.parentElement.parentElement.id;
        Babble.deleteMessage(theDeletedId);
        obj.parentElement.parentElement.remove();

    }
}

// this function is the callback function of the getMessages function, it take an array of messages and display the messages
// from the array in the wanted shape
function displayTheMessages(data){
    document.getElementById("registBox").classList.add("hidden");

    var array = data.array;
    
    
    var theMessagesId;
    var theImg1Url;
    var theUserName;
    var theTimestamp;
    var theMessage;
    var theDelImg = './images/deleteMessage.png';

    for(var i=0; i<array.length; i++){
        
        if(array[i].deleted == 0 && document.getElementById(array[i].id)==null){
        
            theMessagesId = array[i].id;
        theImgUrl = array[i].imgSrc;
        theUserName = array[i].name;
 
        if(theUserName == '')
            theUserName = 'Anonymous';
        theTimestamp = array[i].timestamp;
        theMessage = array[i].message;
        theEmail = array[i].email;
        if(theEmail == '')
            theImgUrl = './images/anonymous.png'

        var newMesasge = '<li Class="Main-messagesMessage" id="' + theMessagesId + '" aria-label="Message" onmouseover="show(this);" onmouseout="hide(this);" tabIndex="0" onfocusin="show(this)" onfocusout="hide(this)">' + 
        '<img src="' + theImgUrl + '" alt="" class="Main-messagesMessageImg" aria-label="user picture">' + 
        '<div class="Main-messagesMessageContent" >' + 
            '<span class="hidden">' + theEmail + '</span>' + 
            '<cite class="Main-messagesMessageContentUsername" aria-label="username">' + theUserName + '</cite>' +
            '<time class="Main-messagesMessageContentTimestamp" datetime="'+ theTimestamp +'" aria-label="time">' + theTimestamp + '</time>' +
            '<button class="Main-messagesMessageContentDeleteIcon hidden" aria-label="delete button" onclick="deleteFunc(this);" aria-label="Delete" tabIndex="0">' +
                '<img src="' + theDelImg + '" alt="">' + 
            '</button>' +
            '<div class="Main-messagesMessageContentData" aria-label="message text">' + theMessage + '</div>' +
        '</div>' +
        '</li>' ;

        document.getElementsByTagName('ol')[0].innerHTML += newMesasge;
        }
    }

    document.getElementsByTagName('ol')[0].scrollTop = document.getElementsByTagName('ol')[0].scrollHeight;
    
        Babble.theCurrentMessagesNumber = Babble.theCurrentMessagesNumber + array.length;
        Babble.getMessages(Babble.theCurrentMessagesNumber, displayTheMessages);
};



// this function is a callback funtion of the getStats function, it display the user and messages number in the top-right corner
function changeTheStats(data){
    
    var numOfUsers = data.users;
    var numOfMsgs = data.messages;

    document.getElementById('numberOfUsers').innerText = numOfUsers;
    document.getElementById('numberOfMessage').innerText = numOfMsgs;

    Babble.getStats(changeTheStats);
    
};
