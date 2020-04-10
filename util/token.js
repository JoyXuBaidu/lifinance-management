const jwt = require("jsonwebtoken");

const db =require('./database');

const KEY = "suiyi";

/*
* Generate token for each user
* @method generteToken
* @param {String} content input username
* @return {String} the generated token for a specific user
*/
exports.generateToken = (content)=> {
  return jwt.sign({username:content},KEY,{expiresIn:10});
}

/*
* Verify whether a koken is valid or not
* @method validToken
* @param {String} username input user name to get specific token
* @return {resolve() or reject()} invoke further action
*/
exports.validToken = async (username)=> {
   const usertoken = await db.execute(`select token from buyer where name='${username}';`);
  jwt.verify(usertoken[0][0].token,KEY,(err)=> {
    if(err) {
      console.log(err);
      db.execute(`update buyer set token=null where name='${username}';`)
      throw err;
    }
    else {
      return;
    } 
  })
}