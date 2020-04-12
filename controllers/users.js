const path = require('path');
const fs = require('fs');

//Import Model into Controller
const User = require("../models/user");

exports.getLoginInfo = function (req,res,next) {
  res.sendFile(path.join(__dirname,'../','views','main.html'));
};

exports.getRegisterInfo = function(req,res,next) {
  res.sendFile(path.join(__dirname,'../','views','register.html'));
}

exports.postRegisterInfo = function(req,res,next) {
  const user = new User(req.body.username,req.body.password);
  user.register(user)
  .then(()=>{res.redirect("/");return;})
  .catch((err) => {
    console.log(err);
    if(String(err).indexOf("Duplicate entry")!=-1) {
      res.send("<script type='text/javascript'>alert('Duplicate username, please try again.');location.href='/register';</script>");
      return;
    }
    res.send("<script type='text/javascript'>alert('Sorry, DB error');location.href='/';</script>");
    return;
  })
}