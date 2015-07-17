var User = require("../models/user.js"),
    mongoose = require("mongoose");

var UsersController = {};

User.find({}, function (err, result) {
  if (err !== null) {
    console.log("SOMETHING WENT HORRIBLY WRONG");
    console.log(err);
  } else if (result.length === 0) {
    console.log("Creating Example User");
    var exampleUser = new User({"username": "antonis"});
    exampleUser.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Saved Example User");
      }
    });
  }
});

UsersController.index = function (req, res) {
  User.find({}, function (err, users) {
    res.json(200, users);
  });
};

UsersController.show = function (req, res) {
  User.find({"username":req.params.username}, function (err, result) {
    if (err) {
      console.log(err);
      res.send(500, err);
    } else if (result.length !== 0) {
      res.sendfile("./client/index.html");
    } else {
      res.send(404);
    }
  });
};

UsersController.create = function (req, res) {
  console.log("create action called");
  res.send(200);
};

UsersController.update = function (req, res) {
  console.log("update action called");
  res.send(200);
};

UsersController.destroy = function (req, res) {
  console.log("destroy action called");
  res.send(200);
};

module.exports = UsersController;