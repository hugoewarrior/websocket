const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

/**
 * Default events
 */

io.on("connection", (socket) => {
    console.log("New user is connected"); 


socket.on("disconnect", ()=>{
    console.log("User is disconnected"); 
}); 


/**
 * Chat event
 */
socket.on("chat",(message)=>{
    io.emit("chat", message); 
})


});


server.listen(port, () => console.log(`Listening on port ${port}`));