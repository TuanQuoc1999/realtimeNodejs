const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res)=>{
//     res.send('hello test');
// });

const io = require('socket.io')(http);
io.on('connection', socket => {
    console.log('connected ready');

     socket.on('sendMessage', msg =>{
         //console.log(msg)
         socket.broadcast.emit('sendtoAll', msg);
     });
});
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});