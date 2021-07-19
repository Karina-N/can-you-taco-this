import CookingGame from "./CookingGame.js";

const allIngredientsArray = [
  { name: "taco shell", img: "" },
  { name: "beef", img: "" },
  { name: "beans", img: "" },
  { name: "salsa", img: "" },
  { name: "lettuce", img: "" },
  { name: "sour cream", img: "" },
  { name: "cheese", img: "" },
  { name: "guacamole", img: "" },
  { name: "sweetcorn", img: "" },
  { name: "jalapenos", img: "" },
];

const cookingGame = new CookingGame(allIngredientsArray, 100, 4);

// Displaying randomRecipe
const randomCombinationDiv = document.getElementById("randomCombination");
const randomRecipe = document.createElement("ul");
randomCombinationDiv.appendChild(randomRecipe);

function renderRecipe() {
  cookingGame.createRandomRecipe().forEach((item) => {
    randomRecipe.innerHTML += `<li>${item.name}</li>`;
  });
}
renderRecipe();

// Displaying list of all ingredients to be clicked
const listOfAllIngredientsDiv = document.getElementById("listOfAllIngredients");
const allIngredientsUL = document.createElement("ul");
listOfAllIngredientsDiv.appendChild(allIngredientsUL);

for (let i = 0; i < allIngredientsArray.length; i++) {
  const listedIngredient = document.createElement("li");
  allIngredientsUL.appendChild(listedIngredient);
  listedIngredient.innerHTML = allIngredientsArray[i].name;
}

// Displaying player selection
const playerSelectionDiv = document.getElementById("playerSelection");
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

const listItem = document.querySelectorAll("#listOfAllIngredients li");
document.querySelector("#listOfAllIngredients").addEventListener("click", function (e) {
  if (playerSelectionList.length < cookingGame.recipeLength) {
    playerSelectionUl.innerHTML = "";

    const indexOfClickedElement = allIngredientsArray.findIndex((i) => i.name === e.target.innerHTML);
    playerSelectionList.unshift(allIngredientsArray[indexOfClickedElement]);
    playerSelectionList.forEach((item) => {
      const listItem = document.createElement("li");
      playerSelectionUl.appendChild(listItem);
      listItem.innerHTML = item.name;
    });
  }
});

// CLEAR BUTTON
const clearButton = document.getElementById("clearSelection");
clearButton.addEventListener("click", clearPlayerSelection);

// SUBMIT BUTTON
const submitButton = document.getElementById("submitSelection");
submitButton.addEventListener("click", submitPlayerSelection);

// DISPLAY POINT
const scoreTable = document.getElementById("scoreTable");
scoreTable.innerHTML = `${cookingGame.playerPoints} / ${cookingGame.maxPoints}`;

function displayPoints() {
  scoreTable.innerHTML = `${cookingGame.playerPoints} / ${cookingGame.maxPoints}`;
}

function checkIfWon() {
  if (cookingGame.playerPoints === cookingGame.maxPoints) {
    return true;
  }
}
