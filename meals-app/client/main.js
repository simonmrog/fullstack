"use-strict";

window.onload = async function() {

  // VARIABLES
  let route;

  function render() {
    const app = document.querySelector("#app");

    const token = localStorage.getItem("token");
    if (token === null || typeof token === "undefined") route = "login";
    else route = "orders";

    if (route === "login") renderLogin(app, route, render);
    else if (route === "orders") renderOrders(app, route, render);
    else renderLogin(app, route, render);
  }

  render();
};