"use-strict";

window.onload = async () => {

  let meals = [];
  const submit = document.querySelector("#submit");

  const getMeals = async () => {
    const res = await fetch("http://localhost:3000/api/meals");
    const data = await res.json();
    return data.meals;
  };

  const setButtonState = () => {
    if (!meals) submit.disabled = true;
    else {
      if (meals.length !== 0) submit.style.display = "inline-block";
      submit.disabled = false;
    }
  };
  
  const renderMeals = () => {
    const $el = document.querySelector("#meals-list");
    $el.innerHTML = 
      meals.map(
        meal => `
          <li key="meal-${meal._id}" class="meal">
            <h3>${meal.name}</h3>
            <p>${meal.desc}</p>
          </li>`
        ).join("");
    setButtonState();
  };

  meals = await getMeals();
  renderMeals();
};