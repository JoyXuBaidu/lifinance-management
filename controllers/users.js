const path = require('path');

//Import Model into Controller
const User = require("../models/user");

exports.getLoginInfo = function (req,res,next) {
  res.sendFile(path.join(__dirname,'../','views','main.html'));
};

exports.getLoginToHome = function (req,res,next) {
    res.send("HI! ");
    next();
};

exports.postLoginToHome = function (req,res,next) {
  const user = new User(req.body.username,req.body.password);
  res.send(user.username+" "+user.password);
};