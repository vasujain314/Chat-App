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
   document.querySelector('body').appendChild(li);
})
// socket.emit('clientMessage',{
//     from:"client",
//     text:"hey"
//  }, 
//  // callback function
//  function(ThisIsCallbackParameter) {
//   console.log(ThisIsCallbackParameter,"got it");
//  });

 document.querySelector('#submit-btn').addEventListener('click',function(e){
     e.preventDefault();

     socket.emit('clientMessage',{
         from:"User",
         text: document.querySelector('input[name="message"]').value
     },function(){

     })
 })