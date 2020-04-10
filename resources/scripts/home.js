$(function(){
  function getToken() {
    const cookie = document.cookie;
    localStorage.setItem('token',cookie);
  }

  getToken();
})