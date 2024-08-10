require("dotenv").config();

const bodyParser = require("body-parser");
const {Server} = require("socket.io");
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const path = require("path");


const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.set("views", __dirname + '/src/views');
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const homeRoute = require("./src/routes/homeRoute");
const getPollRoute = require("./src/routes/getPollRoute");
const makePollRoute = require("./src/routes/makePollRoute");

app.all("/", homeRoute);
app.all("/getPoll/:link", getPollRoute);
app.all("/makePoll", makePollRoute);


io.on("connection", (socket) => {
    console.log("connected !");

    let dt = {
        1 : 0,
        2: 0
    }

    socket.on("poll", (arg) => {
        dt[arg] += 1;
        console.log(dt);
    });
})


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("db connected");
    server.listen(3000, () => {
        console.log("listening on 3000");
    })
})
.catch((err) => console.log(err));