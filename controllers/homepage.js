const Vue = require('vue');
const fs = require('fs');
const path = require('path');

const User = require("../models/user");
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync(path.join(__dirname,'../','views','home.html'), 'utf-8')
});

exports.postLoginToHome = function (req,res,next) {
  const user = new User(req.body.username,req.body.password);
  const username = user.username;
  var subComponent = {
    data : function(){
      return {
        isManager:true,
        addRecordUrl: "/addrecord/"+username, //get dynamic params
        listRecordUrl: "/listrecord/"+username,
        deleteRecordUrl: "/deleterecord/"+username
      }
    },
    template: "<div class='homeButtons'>" +
    "<a v-bind:href='addRecordUrl'>添加采购记录</a>"+
    "<a v-bind:href='listRecordUrl'>查看采购记录</a>"+
    "<a v-if='isManager' v-bind:href='deleteRecordUrl'>删除采购记录</a>"+
    "</div>"
  }
  const homeComponent = new Vue({
        data: function() {
            return {
              username: user.username
            }
          },
        template:"<div class='homePageWrapper'>"+
          "<ul>"+
            "<li id='username'>{{username}}</li>"+
          "</ul>"+
          "<sub-component></sub-component>"+
        "</div>",
        components: {
          'sub-component':subComponent
        }
  });
  user.login(user,
    function(){
      res.redirect("/")
    },
    function(){
      renderer.renderToString(homeComponent, function (err, html) {
        if(err) {
          res.send("Sorry, Internal Error!");
        }
        res.send(html); // html 将是注入应用程序内容的完整页面
      })
    });
};