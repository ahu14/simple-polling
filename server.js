const {Server} = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

io.on("connection", (socket) => {
    console.log("connected !");

    socket.on("test", (arg) => {
        console.log(arg);
    });
})

server.listen(3000, () => {
    console.log("listening on 3000");
})