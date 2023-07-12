"use strict";
const container = document.getElementById("cocktailList");
const search = document.querySelector("#search");
const pagination_element = document.getElementById("pagination");
let page = 0;
// let itemsPerPage = 5;
let recipes = [];

document.addEventListener("DOMContentLoaded", (e) => {
  fetch("http://localhost:3000/cocktails")
    .then((r) => r.json())
    .then((data) => {
      recipes = data; //Assigning the fetched data to the recipe array
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

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";

  div.addEventListener("click", () => {
    openModal(cocktail);
    console.log(cocktail);
  });

  div.append(header, cocktailImg, saveBtn);
  container.appendChild(div); //, ingredientsList, directions, nutritionList); //Acoording to the order
}

function openModal(cocktail) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
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

  modalContent.append(cocktailImg, ingredientsList, directions, nutritionList);
  modal.appendChild(modalContent);

  // Append the modal to the document body
  document.body.appendChild(modal);

  // Add event listener to close the modal
  modal.addEventListener("click", (event) => {
    console.log(event);
    if (event.target === modal) {
      modal.remove();
    }
  });

  //Closing the modal with escape key
  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.remove();
    }
  });
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
