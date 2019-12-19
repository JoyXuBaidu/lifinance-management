const path = require('path');
const fs = require('fs');

//Import Model into Controller
const User = require("../models/user");

exports.getLoginInfo = function (req,res,next) {
  res.sendFile(path.join(__dirname,'../','views','main.html'));
};

exports.getLoginToHome = function (req,res,next) {
    res.send("HI! ");
    next();
};

exports.getRegisterInfo = function(req,res,next) {
  res.sendFile(path.join(__dirname,'../','views','register.html'));
}

exports.postRegisterInfo = function(req,res,next) {
  const user = new User(req.body.username,req.body.password);
  user.register(user);
  res.redirect("/");
}