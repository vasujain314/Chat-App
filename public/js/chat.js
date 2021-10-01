// chat js file 
let socket = io();

function scrollToBottom(){
    let messages= document.querySelector('#message-box').lastElementChild;
    messages.scrollIntoView();
}

socket.on('connect',function () {
    console.log('connected to server');
});

socket.on('disconnect',function() {
    console.log('disconnected to server');
    
});

socket.on('serverMessage',function(message){
   console.log('serverMessage',message);
   let li=document.createElement('li');
   li.innerText=`${message.from}: ${message.text}`
   document.querySelector('#message-box').appendChild(li);
   scrollToBottom();
})


document.querySelector('#submit-btn').addEventListener('click',function(e){
     e.preventDefault();
     socket.emit('clientMessage',{
         from:"User",
         text: document.querySelector('input[name="message"]').value
     },
     function(){

     })
 })
