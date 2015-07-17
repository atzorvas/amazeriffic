var ToDo = require("../models/todo.js"),
    ToDosController = {},
    User = require("../models/user.js");

ToDosController.index = function (req, res) {
  var username = req.params.username || null,
      respondWithToDos;
  // a helper function that gets ToDos
  // based on a query
  respondWithToDos = function (query) {
    ToDo.find(query, function (err, toDos) {
      if (err !== null) {
        res.json(500,err);
      } else {
        res.json(200,toDos);
      }
    });
  };
  if (username !== null) {
    // get the todos associated with the username
    User.find({"username":username}, function (err, result) {
      if (err !== null) {
        res.json(500, err);
      } else if (result.length === 0) {
        // no user with that id found!
        res.send(404);
      } else {
        // respond with this user's todo objects
        respondWithToDos({ "owner" : result[0].id });
      }
    });
  } else {
  // respond with all todos
  respondWithToDos({});
  }
};

ToDosController.create = function (req, res) {
  var username = req.params.username || null,
      newToDo = new ToDo({"description":req.body.description,
                          "tags":req.body.tags});
  
  User.find({"username":username}, function (err, result) {
    if (err) {
      res.send(500);
    } else {
      if (result.length === 0) {
        // the user was not found, so we
        // just create an ownerless todo
        newToDo.owner = null;
      } else {
        // a user was found, so
        // we set the owner of this todo
        // with the user's id
        newToDo.owner = result[0]._id;
      }
      newToDo.save(function (err, result) {
        if (err !== null) {
          res.json(500, err);
        } else {
          res.json(200, result);
        }
      });
    }
  });
};

ToDosController.show = function (req, res) {
  var id = req.params.id;
  ToDo.find({"_id": id}, function (err, todo) {
    if (err !== null) {
      res.json(500, err);
    } else {
      if (todo.length > 0) {
        res.json(200, todo[0]);
      } else {
        res.send(404);
      }
    }
  });
};

module.exports = ToDosController;