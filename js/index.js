import Chronometer from "./Chronometer.js";
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

// LEVEL 1
const cookingGame = new CookingGame(baseIngredients, randomIngredients, 100, 4);
const chronometer = new Chronometer(30);

// Displaying randomRecipe
const randomCombinationDiv = document.getElementById("random-combination");
const randomRecipe = document.createElement("ul");
randomCombinationDiv.appendChild(randomRecipe);

function renderRecipe() {
  cookingGame.createRandomRecipe().forEach((item) => {
    console.log(item);
    const randomRecipeItem = document.createElement("li");
    randomRecipe.appendChild(randomRecipeItem);
    randomRecipeItem.setAttribute("style", `background-image: url(${item.img})`);
    // randomRecipe.innerHTML += `<li>${item.name}</li>`;
  });
}
renderRecipe();

// Displaying list of all ingredients to be clicked
const listOfAllIngredientsDiv = document.getElementById("list-of-all-ingredients");
const allIngredientsUL = document.createElement("ul");
listOfAllIngredientsDiv.appendChild(allIngredientsUL);

// generate all ingredients list
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

// const listItem = document.querySelectorAll("#list-of-all-ingredients li");
document.querySelector("#list-of-all-ingredients").addEventListener("click", function (e) {
  // if the selection not full yet, add another item
  if (playerSelectionList.length < cookingGame.recipeLength) {
    playerSelectionUl.innerHTML = "";

    if (e.target.classList.contains("ingredient")) {
      const indexOfClickedElement = allIngredients.findIndex(
        (i) => i.name === e.target.getAttribute("data-ingredient")
      );
      playerSelectionList.unshift(allIngredients[indexOfClickedElement]);

      playerSelectionList.forEach((item) => {
        const listItem = document.createElement("li");
        playerSelectionUl.appendChild(listItem);
        listItem.setAttribute("style", `background-image: url(${item.img})`);
        listItem.setAttribute("data-ingredient", item.name);
      });
    }
  }
});

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

// CLEAR BUTTON
const clearButton = document.getElementById("clear-selection");
clearButton.addEventListener("click", clearPlayerSelection);

// SUBMIT BUTTON
const submitButton = document.getElementById("submit-selection");
submitButton.addEventListener("click", submitPlayerSelection);

// DISPLAY POINTS
const scoreTable = document.getElementById("score-table");
scoreTable.innerHTML = `PLAYER POINTS:  ${cookingGame.playerPoints} / ${cookingGame.maxPoints}`;

function displayPoints() {
  scoreTable.innerHTML = `${cookingGame.playerPoints} / ${cookingGame.maxPoints}`;
}

function checkIfWon() {
  if (cookingGame.playerPoints === cookingGame.maxPoints && chronometer.currentTime > 0) {
    chronometer.stop();
    secDecElement.innerHTML = 0;
    secUniElement.innerHTML = 0;
    return true;
  }
}

// TIMER
const secDecElement = document.getElementById("secDec");
const secUniElement = document.getElementById("secUni");

window.addEventListener("onload", chronometer.start(printTime));

function printTime() {
  if (chronometer.currentTime < 1) {
    chronometer.stop();
    secDecElement.innerHTML = 0;
    secUniElement.innerHTML = 0;

    cookingGame.randomRecipe = [];
    randomRecipe.innerHTML = "";
    clearPlayerSelection();
    cookingGame.randomRecipe = [];
    randomRecipe.innerHTML = "";
    alert("BETTER LUCK NEXT TIME!");
  } else {
    printSeconds();
  }

  function printSeconds() {
    let seconds = chronometer.computeTwoDigitNumber(chronometer.getSeconds());
    let firstDigit = seconds.toString()[0];
    let secondDigit = seconds.toString()[1];

    secDecElement.innerHTML = firstDigit;
    secUniElement.innerHTML = secondDigit;
  }
}
