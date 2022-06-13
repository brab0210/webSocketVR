const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.resolve(__dirname,'../public')));
app.use(express.static(path.resolve(__dirname,'./views')));

app.get('/', (req,res) => {
    res.status(200).sendFile('index.html');
});

let messages = [{
    id: 1,
    text: "bienvenido al chat privado",
    nickname: "bot - vr.web.es"
}];

io.on('connection', function(socket){
    console.log(`el ip del cliente es: ${socket.handshake.address}`);
    socket.emit('messages', messages);
   // console.log(socket.conn.remoteAddress);
    socket.on('add-message', function(data){
    messages.push(data);
    io.sockets.emit('messages', messages)
   })
});

server.listen(3000, 
() => console.log(`Servidor funcionando en http://localhost:3000`));