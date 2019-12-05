//define local login component
var loginComponent = {
  template: `
  <form action="/home" method="POST">
  <input type="text" placeholder="用户名" name="username">
  <input type="password" name="password">
  <button @click="login(username.value,password.value)" type="submit" id="loginButton">登录</button>
  <a href="/register">注册</a>
  </form>
  `,
  methods: {
    login: function (username,password){
      const user = new user(username,password);
      
    }
  }
}

new Vue({ 
  el:"#loginComponent",
  //local registration components
  components: {
    'login-component': loginComponent
  }
})