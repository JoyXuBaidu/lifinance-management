var registerComponent = {
  template: `
  <form action="/" method="POST">
  <input type="text" placeholder="用户名" name="username">
  <input type="password" name="password">
  <button type="submit" id="registerButton">注册</button>
  </form>`,
  methods: {
  }
}

new Vue({ 
  el:"#registerComponent",
  //local registration components
  components: {
    'register-component': registerComponent
  }
})