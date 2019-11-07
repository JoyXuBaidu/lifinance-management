$("#loginButton").on("click", function () {
  window.location.href = "/home";
});

//define local login component
var loginComponent={ 
  template: `<form>
<input type="text" placeholder="username">
<input type="password" >
<input type="button" value="Login" id="loginButton">
</form>`
}

new Vue({ 
  el:"#loginComponent",
  //local registration components
  components: {
    'login-component': loginComponent
  }
})