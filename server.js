require("dotenv").config();

const polls = require("./src/middleware/model");
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

    socket.on("clicked", async (arg) => {
        await polls.findById(arg.poll_id)
        .then(async dt => {
            for (let i of dt.polling){
                if (i._id == arg.choice_id){
                    i.quantity += 1;
                }
            }

            await polls.findByIdAndUpdate(arg.poll_id, dt, {new : true})
            .then(dt2 => {
                socket.emit("sendData", dt);
                console.log("updated !");
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });

    socket.on("getData", async (arg) => {
        await polls.findById(arg)
        .then(dt => socket.emit("sendingData", dt))
        .catch(err => console.log(err))
    })
})


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("db connected");
    server.listen(3000, () => {
        console.log("listening on 3000");
    })
})
.catch((err) => console.log(err));