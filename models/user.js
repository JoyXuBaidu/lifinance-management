/*Represent Each User Info
  Export User Class 
*/
const fs = require("fs");
const path = require("path");

const users = []; // Temporarily store users Info

//ALL IN ES5
module.exports = User;
function User (username, password) {
  this.username = username;
  this.password = password;
}

User.prototype.register = function(user) {
  const filePath = path.join(path.dirname(process.mainModule.filename),'data','users.json');
  fs.readFile(filePath,function(err, fileContent) {
    var users = [];
    if(!err) {
      users = JSON.parse(fileContent);
    }
    users.push(user);
    fs.writeFile(filePath,JSON.stringify(users),function(err) {
      console.log("???"+err);
    });
  })
}

User.prototype.login = function(user,loginFail,loginSuccess) {
  const filePath = path.join(path.dirname(process.mainModule.filename),'data','users.json');
  fs.readFile(filePath,function(err, fileContent) {
    var users = [];
    if(!err) {
      users = JSON.parse(fileContent);
    }
    console.log(user);
    for(var i=0;i<users.length;i++) {
      if(users[i].username === user.username && users[i].password === user.password) {
        loginSuccess();
        return; // Prevent to trigger another response
      }
    }
    loginFail();
  })
}