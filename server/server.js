const path = require('path')
const http =require('http')
const express = require('express')
const socketio = require('socket.io')

const {generateMessage} = require('./util/message');
const port = process.env.PORT || 3000
let app=express();
let server = http.createServer(app);
let io=socketio(server); 
app.use(express.static(path.join(__dirname,'/../public')));

io.on('connection',(socket)=>{
   // socket.broadcast.emit('serverMessage',generateMessage(message.from,"joined the chat"));
    socket.on('clientMessage',(message,callback)=>{
        // console.log("clientMessage", message);
        // Sending data to client
        socket.broadcast.emit('serverMessage',generateMessage(message.from,"joined the chat"));
        io.emit('serverMessage',generateMessage(message.from,message.text));
        callback("this is server");
    })
    // socket.on('disconnect',()=>{
    //     console.log('user disconnected');
    // });
});
server.listen(port,()=>{
    console.log("server is up on port ${port}");
});
