const path = require('path');
const fs = require('fs');

//Import Model into Controller
const User = require("../models/user");
const db = require("../util/database");

exports.getLoginInfo = function (req,res,next) {
  db.execute(`update buyer set token=null;`);
  res.sendFile(path.join(__dirname,'../','views','main.html'));
};

exports.getRegisterInfo = function(req,res,next) {
  res.sendFile(path.join(__dirname,'../','views','register.html'));
}

exports.postRegisterInfo = function(req,res,next) {
  const user = new User(req.body.username,req.body.password);
  user.register(user)
  .then(()=>{res.redirect("/");return;})
  .catch((err) => {console.log(err);res.send("<script type='text/javascript'>alert('Sorry, DB error')</script>");return;})
}