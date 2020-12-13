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
    socket.on("disconnect", () => {
        console.log("User is disconnected");
    });


    /**
     * On user enter room
     */
    socket.on("user", (user) => {
        console.log(user + " just got here")
        io.emit("user", user)
    })



    /**
     * Chat event
     */
    socket.on("chat", (message, user) => {
        let resp = {
            message, user
        }
        io.emit("chat", resp);
    })


});


server.listen(port, () => console.log(`Listening on port ${port}`));