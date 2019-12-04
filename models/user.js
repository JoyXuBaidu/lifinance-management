/*Represent Each User Info
  Export User Class 
*/

const users = []; // Temporarily store users Info

//ALL IN ES5
module.exports = User;
function User (username, password) {
  this.username = username;
  this.password = password;
}

User.fetchAllUsers = function () {
  return window.users;
}