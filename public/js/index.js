let socket = io();

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