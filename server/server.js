const path = require('path')
const http =require('http')
const express = require('express')
const socketio = require('socket.io')

const port = process.env.PORT || 3000
let app=express();
let server = http.createServer(app);
let io=socketio(server); 
app.use(express.static(path.join(__dirname,'/../public')));

io.on('connection',(socket)=>{
    console.log("new user");
    
    socket.emit('serverMessage',{
        from: "admin",
        text: "Welcome to chat app" 
     })  

    socket.broadcast.emit('serverMessage',{
            from: "admin",
            text: "new user joined" 
         })

    socket.on('clientMessage',(message)=>{
        console.log("clientMessage", message);
        io.emit('serverMessage',{
            from: message.from,
            text: message.text 
        })

        
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });
});
server.listen(port,()=>{
    console.log("server is up on port ${port}");
});
