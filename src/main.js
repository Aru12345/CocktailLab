"use strict";
const container = document.getElementById("cocktailList");
const search = document.querySelector("#search");

let recipes = [];

document.addEventListener("DOMContentLoaded", (e) => {
  fetch("http://localhost:3000/cocktails")
    .then((r) => r.json())
    .then((data) => {
      recipes = data;
      data.forEach((cocktail) => {
        renderCocktail(cocktail);
      });
    });
});

function renderCocktail(cocktail) {
  const div = document.createElement("div");
  div.id = `cocktailCard-${cocktail.id}`;
  div.className = "cocktail-card";

  const header = (document.createElement(
    "h1"
  ).textContent = ` ${cocktail.name}`);

  const cocktailImg = document.createElement("img");
  cocktailImg.src = cocktail.img;
  cocktailImg.alt = `${cocktail.name} image`;

  const ingredientsList = document.createElement("ul");
  cocktail.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = `${ingredient.quatity} ${ingredient.description}`;
    ingredientsList.appendChild(li);
  });

  const directions = document.createElement("h3");
  directions.textContent = `${cocktail.directions}`;

  const nutritionList = document.createElement("ul");
  const nutrition = cocktail.nutrition[0];
  const caloriesLi = document.createElement("li");
  caloriesLi.textContent = `Calories: ${nutrition.calories}`;

  const carbsLi = document.createElement("li");
  const carbs = nutrition.carbs[0];
  carbsLi.textContent = `Carbs: ${carbs.quantity}${carbs.description}`;

  nutritionList.appendChild(caloriesLi);
  nutritionList.appendChild(carbsLi);

  div.append(header, cocktailImg, ingredientsList, directions, nutritionList); //Acoording to the order
  container.appendChild(div);
}

search.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().startsWith(searchString);
  });

  displayFilteredRecipes(filteredRecipes);
});
function displayFilteredRecipes(filteredRecipes) {
  container.innerHTML = ""; // Clear previous results

  if (filteredRecipes.length === 0) {
    container.innerHTML = "No results found.";
    return;
  }

  filteredRecipes.forEach((recipe) => {
    renderCocktail(recipe);
  });
}
