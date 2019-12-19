//define local login component
var loginComponent = {
  template: `
  <form v-bind:action="actionUrl" method="POST">
  <input type="text" placeholder="用户名" name="username" v-model="userInput">
  <input type="password" name="password">
  <button type="submit" id="loginButton">登录</button>
  <a href="/register">注册</a>
  </form>
  `,
  data :function () {
    return {
      actionUrl: "",
      userInput: ""
    }
  },
  watch: {
    userInput: function () {
      this.actionUrl="/home/"+this.userInput;
    }
  },
  methods: {
  }
}

new Vue({ 
  el:"#loginComponent",
  //local registration components
  components: {
    'login-component': loginComponent
  }
})