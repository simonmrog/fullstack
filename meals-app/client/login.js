"use strict";

function renderLogin(app, route, render) {
  app.innerHTML = document.querySelector("#login-view").innerHTML;

  const register = document.querySelector(".register");
  const emailInput = document.querySelector(".email-input");
  const passwordInput = document.querySelector(".password-input");
  const loginButton = document.querySelector(".login-button");

  async function registerUser() {
    const email = emailInput.value;
    const password = passwordInput.value;
    if (email === "" || password === "") alert("Fill all the fields");
    else {
      try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
        const response = await res.json();
        if (response.status === "error") throw { message: response.message };
        alert(response.message);
        emailInput.value = "";
        passwordInput.value = "";
      } catch(err) {
        alert(err.message);
      }
    }
  }

  async function loginUser() {
    const email = emailInput.value;
    const password = passwordInput.value;
    if (email === "" || password === "") alert("Fill all the fields");
    else {
      try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
        const response = await res.json();
        if (response.status === "error") throw { message: response.message };
        localStorage.setItem("token", response.token);
        const userData = await fetch("http://localhost:3000/api/auth/me", {
          headers: { "Authorization": localStorage.getItem("token") }
        });
        const data = await userData.json();
        localStorage.setItem("user", data.email);
        route = "orders";
        render();
        emailInput.value = "";
        passwordInput.value = "";
      } catch(err) {
        alert(err.message);
      }
    }
  }

  function handleKeypress(e) {
    if (e.keyCode === 13) loginUser();
  }

  register.addEventListener("click", registerUser);
  loginButton.addEventListener("click", loginUser);
  emailInput.addEventListener("keypress", handleKeypress);
  passwordInput.addEventListener("keypress", handleKeypress);
}
