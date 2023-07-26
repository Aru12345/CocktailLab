"use strict";
const container = document.getElementById("cocktailList");
const search = document.querySelector("#search");
let page = 0;
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

  div.addEventListener("click", () => {
    openModal(cocktail);
  });

  div.append(header, cocktailImg);
  container.appendChild(div); //Acoording to the order
}

function openModal(cocktail) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const servings = document.createElement("p");
  servings.textContent = `Number of Servings: ${cocktail.servings}`;
  const addition = document.createElement("button");
  addition.innerHTML = "+";

  const subtraction = document.createElement("button");
  subtraction.innerHTML = "-";

  addition.addEventListener("click", increaseValues);
  subtraction.addEventListener("click", decreaseValues);

  function increaseValues() {
    const originalServings = cocktail.servings; //Storing the original number
    cocktail.servings++; // Incrementing the value of cocktail.servings
    servings.textContent = `Number of Servings: ${cocktail.servings}`; // Update the text content

    const servingsRatio = cocktail.servings / originalServings;
    cocktail.ingredients.forEach((ingredient) => {
      ingredient.quantity =
        Math.round(ingredient.quantity * servingsRatio * 100) / 100; // Calculated the new quantity by doubling the current quantity
    });

    ingredientsList.innerHTML = ""; // Clear the existing list
    cocktail.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = `${ingredient.quantity} ${ingredient.description}`;
      ingredientsList.appendChild(li);
    });
  }

  function decreaseValues() {
    const originalServings = cocktail.servings;
    if (originalServings > 1) {
      cocktail.servings--;
      servings.textContent = `Number of Servings: ${cocktail.servings}`;

      const servingsRatio = cocktail.servings / originalServings;
      cocktail.ingredients.forEach((ingredient) => {
        ingredient.quantity =
          Math.round(ingredient.quantity * servingsRatio * 100) / 100;
      });

      ingredientsList.innerHTML = "";
      cocktail.ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = `${ingredient.quantity} ${ingredient.description}`;
        ingredientsList.appendChild(li);
      });
    }
  }

  const cocktailImg = document.createElement("img");
  cocktailImg.src = cocktail.img;

  const ingredientsList = document.createElement("ul");
  cocktail.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = `${ingredient.quantity} ${ingredient.description}`;
    ingredientsList.appendChild(li);
  });

  const directions = document.createElement("h3");
  directions.textContent = cocktail.directions;

  let isFav = false;
  const favButton = document.createElement("button");
  favButton.textContent = "Save";

  const existingFavs = JSON.parse(localStorage.getItem("favorites")) || [];
  const recipeID = `cocktailCard-${cocktail.id}`;
  if (existingFavs.includes(recipeID)) {
    isFav = true;
    favButton.textContent = "Saved";
  }

  function toggleFavorite() {
    isFav = !isFav;
    favButton.textContent = isFav ? "Saved" : "Save";
    console.log("Toggle isFav:", isFav);
    console.log("Existing Favorites before update:", existingFavs);

    if (isFav) {
      existingFavs.push(recipeID);
    } else {
      const index = existingFavs.indexOf(recipeID);
      if (index !== -1) {
        existingFavs.splice(index, 1);
      }
    }
    localStorage.setItem("favorites", JSON.stringify(existingFavs));
  }
  favButton.addEventListener("click", toggleFavorite);

  modalContent.append(
    subtraction,
    addition,
    servings,
    cocktailImg,
    ingredientsList,
    directions,
    favButton
  );
  modal.appendChild(modalContent);

  // Append the modal to the document body
  document.body.appendChild(modal);

  // Add event listener to close the modal
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  // Closing the modal with escape key
  document.addEventListener("keydown", (event) => {
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
