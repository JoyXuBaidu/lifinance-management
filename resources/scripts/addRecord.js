const addrecords = {
  data: function() {
    return {
      username: window.location.pathname.split("/")[2],
      itemVal: "",
      moneyVal: 0,
      dateVal: null 
    }
  },
  template :
  `<div id="addrecords">
    <ul>
      <li>采购物品：<input type="text" id="item" v-model="itemVal"/></li>
      <li>采购金额：<input type="number" id="money" v-model="moneyVal" min=0 /></li>
      <li>采购日期：<input type="date" id="date" v-model="dateVal"/></li>
      <li>采购人员：<input type="text" v-model="username" disabled id="username"/></li>
    </ul>
    <button id="addBtn" @click=postRecord()>提交</button>
  </div>
  `,
  methods: {
    postRecord: function() {
      const self = this;
      $.ajax({
        url:"/postrecord/"+self.username,
        type: "POST",//新增就用post，非幂等操作，即重复执行两次会新建两个实例
        data: {
          item: self.itemVal,
          money: self.moneyVal,
          date: self.dateVal,
          username: self.username
        },
        success: function(res,textStatus, xhr) {
          if(xhr.status == 200){
            alert("添加成功！");
          location.href = "/home/"+self.username;
          }
        },
        error: function(err) {
          console.log(err);
          if(err.getResponseHeader("loginstatus")){
            location.href = "/";
          }
        }
      })
    }
  }
};

const vm = new Vue({
  el: "#addrecords",
  components: {
    'add-record-component': addrecords
  }
})