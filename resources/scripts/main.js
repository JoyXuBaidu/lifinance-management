//define local login component
var loginComponent = {
  template: `
  <form action="/action" method="POST">
  <input type="text" placeholder="用户名" name="username">
  <input type="password" name="password">
  <div id="loginButtons">
  <button type="submit" id="loginButton">登录</button>
  <a id="registerButton" href="/register">注册</a>
  </div>
  </form>`,
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