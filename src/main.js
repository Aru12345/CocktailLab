"use strict";
const container = document.getElementById("cocktailList");

function renderCocktail(cocktail) {
  const div = document.createElement("div");
  div.id = `cocktailCard-${cocktail.id}`;
  div.className = "cocktail-card";

  const header = document.createElement("h1");
  header.textContent = ` ${cocktail.name}`;
  console.log(header);
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

document.addEventListener("DOMContentLoaded", (e) => {
  fetch("http://localhost:3000/cocktails")
    .then((r) => r.json())
    .then((data) => {
      data.forEach((cocktail) => {
        renderCocktail(cocktail);
      });
    });
});
