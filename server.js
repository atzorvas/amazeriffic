var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    bodyParser = require('body-parser'),
    app = express(),
    ToDo = require("./models/todo.js"),
    toDosController = require("./controllers/todos_controller.js"),
    usersController = require("./controllers/users_controller.js");
        
app.use(express.static(__dirname + "/client"));
app.use(bodyParser());

mongoose.connect('mongodb://localhost/amazeriffic');

http.createServer(app).listen(3000);

app.get("/todos.json", toDosController.index);
app.get("/todos/:id", toDosController.show);
app.post("/todos", toDosController.create);

app.get("/users.json", usersController.index);
app.post("/users", usersController.create);
app.get("/users/:username", usersController.show);
app.put("/users/:username", usersController.update);
app.del("/users/:username", usersController.destroy);

app.get("/users/:username/todos.json", toDosController.index);
app.post("/users/:username/todos", toDosController.create);
// app.put("/users/:username/todos/:id", toDosController.update);
// app.del("/users/:username/todos/:id", toDosController.destroy);