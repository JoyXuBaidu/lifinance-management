/*Represent Each User Info
  Export User Class 
*/
const db = require('../util/database');

//ALL IN ES5
module.exports = User;
function User (username, password) {
  this.username = username;
  this.password = password;
}

User.prototype.register = function(user) {
  const userName = user.username;
  const userPassword = user.password; 
 
  return db.execute(`insert into buyer (name,password) values ('${userName}','${userPassword}');`);
}

User.prototype.login = function(user,loginFail,loginSuccess) {
  const res=db.execute(`select * from buyer where name="${user.username}" and password="${user.password}";`);
  res.then(data =>{
    if(data[0].length>0){
      loginSuccess();
      return;
    }
    else {
      loginFail();
    }
  })
}