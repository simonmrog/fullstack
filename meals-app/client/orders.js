"use strict";

async function renderOrders(app, route, render) {
  app.innerHTML = document.querySelector("#orders-view").innerHTML;

  const submit = document.querySelector("#submit");
  const deleteButton = document.querySelector("#delete");
  const logoutButton = document.querySelector(".logout");

  let meals;
  let orders;
  let selectedMeal = "";

  // FUNCTIONS
  function createHTMLElement(string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(string, "text/html");
    return doc.body.firstChild;
  }

  async function getResource(type) {
    let meals;
    try {
      const res = await fetch(`http://localhost:3000/api/${type}`, {
        headers: { "Authorization": localStorage.getItem("token") }
      });
      if (!res.ok) throw { message: res.statusText }; 
      const data = await res.json();
      meals = data[type];
    } catch(err) {
      alert(`cannot get ${type}: ${err.message}`);
      meals = [];
    } finally {
      return meals;
    }
  };

  function setSubmitState() {
    if (meals.length !== 0) submit.style.display = "inline-block";
    else submit.style.display = "none";
    selectedMeal === "" ? submit.disabled = true : submit.disabled = false; 
  };

  function setDeleteState() {
    if (orders.length !== 0) deleteButton.style.display = "inline-block";
    else deleteButton.style.display = "none";
  };

  function selectOrder(meal, mealElement) {
    const mealElements = document.querySelectorAll(".meal");
    mealElements.forEach(function(el) {
      if (el !== mealElement) el.classList.remove("selected");
    });
    if (mealElement.classList.contains("selected")) {
      mealElement.classList.remove("selected");
      selectedMeal = "";
    }
    else {
      mealElement.classList.add("selected");
      selectedMeal = meal._id;
    }
    setSubmitState();
  }
  
  function renderMeals() {
    const mealsList = document.querySelector(".meals-list");
    // cleaning the node
    mealsList.textContent = "";
    const mealsListElements = meals.map(function(meal) {
      const mealElement = createHTMLElement(`
        <li key="meal-${meal._id}" class="meal">
          <h3>${meal.name}</h3>
          <p>${meal.desc}</p>
        </li>`);
      mealElement.addEventListener(
        "click",
        selectOrder.bind(this, meal, mealElement)
      );
      return mealElement;
    });
    mealsListElements.forEach(function(el) {
      mealsList.appendChild(el);
    });
    setSubmitState();
  };

  function renderOrdersList() {
    const ordersList = document.querySelector(".orders-list");
    // cleaning the node
    ordersList.textContent = "";
    const ordersListElements = orders.map(function(order) {
      const meal = meals.find(meal => meal._id === order.orderId);
      return createHTMLElement(`
        <li key="order-${order._id}" class="order">
          <h3>${meal.name}</h3>
          <p>${meal.desc}</p>
          <p>${order.userId}</p>
        </li>`);
    });
    ordersListElements.forEach(function(el) {
      ordersList.appendChild(el);
    });
    setDeleteState();
  }

  // DOM EVENTS
  async function createOrder(e) {
    e.preventDefault();
    const order = {
      orderId: selectedMeal,
      userId: localStorage.getItem("user")
    }
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "post",
        headers: {
          "Authorization": localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      });
      if (!res.ok) throw { message: res.statusText };
      orders = await getResource("orders");
      renderOrdersList();
      } catch(err) {
        alert(`Error: ${err.message}`);
      };
  }

  async function deleteOrders() {
    try {
      orders.forEach(async function(order) {
        const res = await fetch(`http://localhost:3000/api/orders/${order._id}`, {
          method: "delete",
          headers: { "Authorization": localStorage.getItem("token") }
        });
        if (!res.ok) throw { message: res.statusText };
        orders = await getResource("orders");
        renderOrdersList();
      });
    } catch(err) {
      alert(err.message);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    render();
  }

  submit.addEventListener("click", createOrder);
  deleteButton.addEventListener("click", deleteOrders);
  logoutButton.addEventListener("click", logout);
  // getting meals from API
  meals = await getResource("meals");
  renderMeals();
  orders = await getResource("orders");
  renderOrdersList();
}
