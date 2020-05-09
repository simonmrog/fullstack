"use-strict";

window.onload = async () => {

  let meals = [];

  const getMeals = async () => {
    const res = await fetch("https://meals-app.now.sh/api/meals");
    const data = await res.json();
    return data.meals;
  };

  const setButtonState = () => {
    const button = document.querySelector("#submit");
    if (!meals) button.disabled = true;
    else {
      if (meals.length !== 0) button.style.display = "inline-block";
      button.disabled = false;
    }
  };
  
  const renderMeals = () => {
    const $el = document.querySelector("#meals-list");
    $el.innerHTML = 
      meals.map(
        meal => `
          <li class="meal">
            <h3>${meal.name}</h3>
            <p>${meal.desc}</p>
          </li>`
        ).join("");

    setButtonState();
  };

  meals = await getMeals();
  renderMeals();
};