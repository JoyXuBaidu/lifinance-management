const Vue = require('vue');
const fs = require('fs');
const path = require('path');

const User = require("../models/user");
const tokenHelper = require("../util/token");
const Record = require('../models/record');
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync(path.join(__dirname,'../','views','home.html'), 'utf-8')
});

const recordHelper = new Record();
exports.getLoginToHome = async function(req,res,next) {
  const username = req.params.userId;
  let flag =false;
  await tokenHelper.returnToMainPage(req.params.userId,res).catch(()=>{flag= true;});
  if(flag) return;
  let records;
  await recordHelper.getRecords(username).then((res)=>{records = res[0];}).catch(err => {console.log(err);});
  var subComponent = {
    data : function(){
      return {
        isManager:true,
        addRecordUrl: "/addrecord/"+username //get dynamic params
      }
    },
    template: "<div class='homeButtons'>" +
    "<a v-bind:href='addRecordUrl'>添加采购记录</a>"+
    "</div>"
  };
  var tableComponent = {
    data: function(){
      return {
        records: records
      }
    },
    template: 
    `<table id="homeTable" border="1">
      <tr>
        <th>序号</th>
        <th>采购人</th>
        <th>采购商品</th>
        <th>采购总额</th>
        <th>采购日期</th>
        <th>操作</th>
      </tr>
      <tr v-for="(record,index) in records">
        <td>{{index+1}}</td>
        <td>{{record.buyerName}}</td>
        <td>{{record.item}}</td>
        <td>{{record.money}}</td>
        <td>{{record.buydate.toString().substr(0,15)}}</td>
        <td><button>删除</button></td>
      </tr>
    </table>`
  };
  const homeComponent = new Vue({
        data: function() {
            return {
              username: username
            }
          },
        template:"<div class='homePageWrapper'>"+
          "<ul>"+
            "<li id='username'>欢迎 {{username}}</li>"+
          "</ul>"+
          "<table-component></table-component>"+
          "<sub-component></sub-component>"+
        "</div>",
        components: {
          'sub-component':subComponent,
          'table-component': tableComponent
        }
  });
  renderer.renderToString(homeComponent, function (err, html) {
    if(err) {
      res.send("Sorry, Internal Error!");
    }
    res.send(html); // html 将是注入应用程序内容的完整页面
  })
};

exports.postLoginToHome =async function (req,res,next) {
  const user = new User(req.body.username,req.body.password);
  const username = user.username;
  let records,token;
  await tokenHelper.getToken(username).then(res => {token=res[0][0].token;}).catch(err => {console.log(err);});
  if(token!=null) {
    let flag =false;
    await tokenHelper.returnToMainPage(req.params.userId,res).catch(()=>{flag= true;});
    if(flag) return;
  }
  await recordHelper.getRecords(username).then((res)=>{records = res[0];}).catch(err => {console.log(err);});
  var subComponent = {
    data : function(){
      return {
        isManager:true,
        addRecordUrl: "/addrecord/"+username //get dynamic params
      }
    },
    template: "<div class='homeButtons'>" +
    "<a v-bind:href='addRecordUrl'>添加采购记录</a>"+
    "</div>"
  };
  var tableComponent = {
    data: function(){
      return {
        records: records
      }
    },
    template: 
    `<table id="homeTable" border="1">
      <tr>
        <th>序号</th>
        <th>采购人</th>
        <th>采购商品</th>
        <th>采购总额</th>
        <th>采购日期</th>
        <th>操作</th>
      </tr>
      <tr v-for="(record,index) in records">
        <td>{{index+1}}</td>
        <td>{{record.buyerName}}</td>
        <td>{{record.item}}</td>
        <td>{{record.money}}</td>
        <td>{{record.buydate.toString().substr(0,15)}}</td>
        <td><button>删除</button></td>
      </tr>
    </table>`
  };
  const homeComponent = new Vue({
        data: function() {
            return {
              username: user.username
            }
          },
        template:"<div class='homePageWrapper'>"+
          "<ul>"+
            "<li id='username'>欢迎 {{username}}</li>"+
          "</ul>"+
          "<table-component></table-component>"+
          "<sub-component></sub-component>"+
        "</div>",
        components: {
          'sub-component':subComponent,
          'table-component': tableComponent
        }
  });
  user.login(user,
    function(){
      res.redirect("/");
      return;
    },
    function(){
      renderer.renderToString(homeComponent, async function (err, html) {
        if(err) {
          //console.log(err);
          res.send("Sorry, Internal Error!");
          return;
        }; 
        if(token==null) {
          tokenHelper.setToken(username);
          //res.append('Set-Cookie',usertoken);//注入token,方便客户端通过cookie获取
        }
        res.send(html); // html 将是注入应用程序内容的完整页面
      })
    });
};