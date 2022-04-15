var express = require("express");
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.static("public"));

let counter1 = 0;
let counter2 = 0;
let counter3 = 0;

function increment() {
  counter1 += counter1 === 9999 ? -counter1 : 1;
  counter2 += counter2 === 9998 ? -counter2 : 2;
  counter3 += counter3 === 9999 ? -counter3 : 3;

  console.log(counter1, counter2, counter3);
}

app.get("/", function (req, res) {
  res.render("index", { counter1, counter2, counter3 });
});

//Whenever someone connects this gets executed
io.on("connection", function (socket) {
  console.log("A user connected");

  // res.render(__dirname + "/index.ejs", { counter1, counter2, counter3 });
  setInterval(() => {
    increment();
    socket.send({ counter1, counter2, counter3 });
  }, 1000);
  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});
http.listen(3000, function () {
  console.log("listening on port :3000");
});
