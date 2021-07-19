import CookingGame from "./CookingGame.js";

const baseIngredients = [{ name: "taco shell", img: "/images/taco-shell.png" }];
const randomIngredients = [
  { name: "beef", img: "/images/beef.png" },
  { name: "beans", img: "/images/beans.png" },
  { name: "tomatoes", img: "/images/tomatoes.png" },
  { name: "lettuce", img: "/images/lettuce.png" },
  { name: "onions", img: "/images/onions.png" },
  { name: "cheese", img: "/images/cheese.png" },
  { name: "guacamole", img: "/images/guacamole.png" },
  { name: "sweetcorn", img: "/images/sweetcorn.png" },
  { name: "jalapenos", img: "/images/jalapenos.png" },
];

const allIngredients = baseIngredients.concat(randomIngredients);
const cookingGame = new CookingGame(baseIngredients, randomIngredients, 100, 4);

// Displaying randomRecipe
const randomCombinationDiv = document.getElementById("random-combination");
const randomRecipe = document.createElement("ul");
randomCombinationDiv.appendChild(randomRecipe);

function renderRecipe() {
  cookingGame.createRandomRecipe().forEach((item) => {
    randomRecipe.innerHTML += `<li>${item.name}</li>`;
  });
}
renderRecipe();

// Displaying list of all ingredients to be clicked
const listOfAllIngredientsDiv = document.getElementById("list-of-all-ingredients");
const allIngredientsUL = document.createElement("ul");
listOfAllIngredientsDiv.appendChild(allIngredientsUL);

// generate base ingredients list
// const listedIngredient = document.createElement("li");
// allIngredientsUL.appendChild(listedIngredient);
// listedIngredient.innerHTML = baseIngredients.name;
// listedIngredient.setAttribute("class", "ingredient");
// listedIngredient.setAttribute("style", `background-image: url(${baseIngredients.img})`);

// generate random ingredients list
for (let i = 0; i < allIngredients.length; i++) {
  const listedIngredient = document.createElement("li");
  allIngredientsUL.appendChild(listedIngredient);
  // listedIngredient.innerHTML = allIngredients[i].name;
  listedIngredient.setAttribute("class", "ingredient");
  listedIngredient.setAttribute("style", `background-image: url(${allIngredients[i].img})`);
  listedIngredient.setAttribute("data-ingredient", allIngredients[i].name);
}

// Displaying player selection
const playerSelectionDiv = document.getElementById("player-selection");
let playerSelectionList = [];
const playerSelectionUl = document.createElement("ul");
playerSelectionDiv.appendChild(playerSelectionUl);

function clearPlayerSelection() {
  playerSelectionUl.innerHTML = "";
  playerSelectionList = [];
}

function submitPlayerSelection() {
  const originalArray = cookingGame.randomRecipe.map((item) => item.name);
  const createdArray = playerSelectionList.map((item) => item.name);
  if (JSON.stringify(originalArray) === JSON.stringify(createdArray)) {
    alert("YOU ARE RIGHT");
    cookingGame.playerPoints += 50;
    displayPoints();
    if (checkIfWon()) {
      alert(`WOW, YOU WON THE GAME!!`);
      cookingGame.randomRecipe = [];
      randomRecipe.innerHTML = "";
    } else {
      cookingGame.randomRecipe = [];
      randomRecipe.innerHTML = "";
      renderRecipe();
    }
  } else {
    alert("TRY AGAIN");
  }
  clearPlayerSelection();
}

// const listItem = document.querySelectorAll("#list-of-all-ingredients li");
document.querySelector("#list-of-all-ingredients").addEventListener("click", function (e) {
  if (playerSelectionList.length < cookingGame.recipeLength) {
    playerSelectionUl.innerHTML = "";

    if (e.target.classList.contains("ingredient")) {
      // playerSelectionList.unshift(baseIngredients);

      const indexOfClickedElement = allIngredients.findIndex(
        (i) => i.name === e.target.getAttribute("data-ingredient")
      );
      playerSelectionList.unshift(allIngredients[indexOfClickedElement]);

      playerSelectionList.forEach((item) => {
        const listItem = document.createElement("li");
        playerSelectionUl.appendChild(listItem);
        listItem.innerHTML = item.name;
      });
    }
  }
});

// CLEAR BUTTON
const clearButton = document.getElementById("clear-selection");
clearButton.addEventListener("click", clearPlayerSelection);

// SUBMIT BUTTON
const submitButton = document.getElementById("submit-selection");
submitButton.addEventListener("click", submitPlayerSelection);

// DISPLAY POINT
const scoreTable = document.getElementById("score-table");
scoreTable.innerHTML = `Player points:  ${cookingGame.playerPoints} / ${cookingGame.maxPoints}`;

function displayPoints() {
  scoreTable.innerHTML = `${cookingGame.playerPoints} / ${cookingGame.maxPoints}`;
}

function checkIfWon() {
  if (cookingGame.playerPoints === cookingGame.maxPoints) {
    return true;
  }
}
