import Chronometer from "./Chronometer.js";
import CookingGame from "./CookingGame.js";
import {
  baseIngredientsTaco,
  randomIngredientsTaco,
  baseIngredientsBurger,
  randomIngredientsBurger,
  baseIngredientsSalad,
  randomIngredientsSalad,
} from "./data.js";

// html elements
const levelElm = document.getElementById("level");
const scoreTable = document.getElementById("score-table");
const randomCombinationElm = document.getElementById("random-combination");
const playerSelectionElm = document.getElementById("player-selection");
const listOfAllIngredientsElm = document.getElementById("list-of-all-ingredients");
const messageElm = document.querySelector("#message");

let baseIngredients;
let randomIngredients;
let playerSelectionList = [];

// get query params
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("recipe");
if (myParam === "taco") {
  baseIngredients = baseIngredientsTaco;
  randomIngredients = randomIngredientsTaco;
} else if (myParam === "burger") {
  baseIngredients = baseIngredientsBurger;
  randomIngredients = randomIngredientsBurger;
} else if (myParam === "salad") {
  baseIngredients = baseIngredientsSalad;
  randomIngredients = randomIngredientsSalad;
}

// initial level setup
let currentLevel = 0;
const levelSettings = [
  { time: 45, points: 10, randLength: 4, oneLevelIngredients: 4 },
  { time: 40, points: 10, randLength: 4, oneLevelIngredients: 6 },
  { time: 40, points: 40, randLength: 4, oneLevelIngredients: 6 },
  { time: 40, points: 60, randLength: 4, oneLevelIngredients: 6 },
  { time: 35, points: 60, randLength: 4, oneLevelIngredients: 6 },
  { time: 35, points: 70, randLength: 4, oneLevelIngredients: 8 },
  { time: 35, points: 80, randLength: 4, oneLevelIngredients: 8 },
  { time: 35, points: 80, randLength: 4, oneLevelIngredients: 10 },
  { time: 30, points: 80, randLength: 4, oneLevelIngredients: 10 },
  { time: 30, points: 100, randLength: 4, oneLevelIngredients: 10 },
];

const allIngredients = baseIngredients.concat(randomIngredients);
let currentLevelIngredients = allIngredients.slice(0, levelSettings[currentLevel].oneLevelIngredients);
const cookingGame = new CookingGame(
  baseIngredients,
  randomIngredients,
  levelSettings[currentLevel].points,
  levelSettings[currentLevel].randLength,
  levelSettings[currentLevel].oneLevelIngredients
);
const chronometer = new Chronometer(levelSettings[currentLevel].time);

function startNewGame() {
  listOfAllIngredientsElm.innerHTML = "";
  renderPoints();
  levelElm.innerHTML = `LEVEL ${currentLevel + 1}`;
  currentLevelIngredients = allIngredients.slice(0, levelSettings[currentLevel].oneLevelIngredients);
  cookingGame.oneLevelIngredients = levelSettings[currentLevel].oneLevelIngredients;
  let recipe = cookingGame.createRandomRecipe();
  renderIngredientsList(allIngredients, currentLevelIngredients);
  renderRecipe(recipe);
  chronometer.currentTime = levelSettings[currentLevel].time;
  chronometer.start(printTime);
}

function renderRecipe(recipe) {
  recipe.forEach((item) => {
    const randomRecipeItem = document.createElement("li");
    randomCombinationElm.appendChild(randomRecipeItem);
    randomRecipeItem.setAttribute("style", `background-image: url("${item.img}")`);
  });
}

function renderIngredientsList(allIngredients, currentLevelIngredients) {
  for (let i = 0; i < currentLevelIngredients.length; i++) {
    const listedIngredient = document.createElement("li");
    listOfAllIngredientsElm.appendChild(listedIngredient);
    listedIngredient.setAttribute("class", "ingredient");
    listedIngredient.setAttribute("style", `background-image: url("${currentLevelIngredients[i].img}")`);
    listedIngredient.setAttribute("data-ingredient", currentLevelIngredients[i].name);
  }
  for (let i = currentLevelIngredients.length; i < allIngredients.length; i++) {
    const listedIngredient = document.createElement("li");
    listOfAllIngredientsElm.appendChild(listedIngredient);
    listedIngredient.setAttribute("class", "fillers");
    listedIngredient.setAttribute("style", `background-image: url(./images/question-mark.png)`);
    listedIngredient.style.backgroundSize = "30px";
  }
}

document.querySelector("#list-of-all-ingredients").addEventListener("click", function (e) {
  removeMessage();

  // if the selection not full yet, add another item
  if (playerSelectionList.length < cookingGame.recipeLength) {
    playerSelectionElm.innerHTML = "";

    if (e.target.classList.contains("ingredient")) {
      const indexOfClickedElement = allIngredients.findIndex(
        (i) => i.name === e.target.getAttribute("data-ingredient")
      );
      playerSelectionList.unshift(allIngredients[indexOfClickedElement]);

      playerSelectionList.forEach((item) => {
        const listItem = document.createElement("li");
        playerSelectionElm.appendChild(listItem);
        listItem.setAttribute("style", `background-image: url("${item.img}")`);
        listItem.setAttribute("data-ingredient", item.name);
      });
    }
  }
});

function clearPlayerSelection() {
  playerSelectionElm.innerHTML = "";
  playerSelectionList = [];
}

function submitPlayerSelection() {
  const originalArray = cookingGame.randomRecipe.map((item) => item.name);
  const createdArray = playerSelectionList.map((item) => item.name);
  if (JSON.stringify(originalArray) === JSON.stringify(createdArray)) {
    cookingGame.playerPoints += 10;
    renderMessage("success");
    renderPoints();
    if (checkIfWon()) {
      cookingGame.randomRecipe = [];
      randomCombinationElm.innerHTML = "";
      cookingGame.playerPoints = 0;
      removeMessage();
    } else {
      cookingGame.randomRecipe = [];
      randomCombinationElm.innerHTML = "";
      const recipe = cookingGame.createRandomRecipe();
      renderRecipe(recipe);
    }
  } else {
    renderMessage("failure");
  }
  clearPlayerSelection();
}

function renderMessage(status) {
  if (status === "success") {
    messageElm.innerHTML = "Well done!";
    messageElm.style.color = "green";
    messageElm.style.display = "block";
  } else if (status === "failure") {
    messageElm.innerHTML = "Try again!";
    messageElm.style.color = "#ed4234";
    messageElm.style.display = "block";
  }
}

function removeMessage() {
  messageElm.innerHTML = "";
}

function renderGameOverMessage() {
  const gameOverElm = document.getElementById("game-over-message");
  gameOverElm.style.display = "block";
}

function renderWinnerMessage() {
  const winnerElm = document.getElementById("winner-message");
  winnerElm.style.display = "block";
}

// CLEAR BUTTON
const clearButton = document.getElementById("clear-selection");
clearButton.addEventListener("click", clearPlayerSelection);

// SUBMIT BUTTON
const submitButton = document.getElementById("submit-selection");
submitButton.addEventListener("click", submitPlayerSelection);

function renderPoints() {
  scoreTable.innerHTML = `PLAYER POINTS: ${cookingGame.playerPoints} / ${levelSettings[currentLevel].points}`;
}

function checkIfWon() {
  if (cookingGame.playerPoints === levelSettings[currentLevel].points && chronometer.currentTime > 0) {
    chronometer.stop();
    if (currentLevel === 1) {
      renderWinnerMessage();
    } else {
      currentLevel++;
      $("#exampleModal").modal("show");
      resetTimer();
      return true;
    }
  }
}

// TIMER
const secDecElement = document.getElementById("secDec");
const secUniElement = document.getElementById("secUni");

function printTime() {
  if (chronometer.currentTime < 1) {
    chronometer.stop();
    resetTimer();

    cookingGame.randomRecipe = [];
    randomCombinationElm.innerHTML = "";
    clearPlayerSelection();
    cookingGame.randomRecipe = [];
    randomCombinationElm.innerHTML = "";
    renderGameOverMessage();
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

function resetTimer() {
  secDecElement.innerHTML = 0;
  secUniElement.innerHTML = 0;
}

// MODAL
const modalElm = document.getElementById("exampleModal");
modalElm.setAttribute("data-backdrop", "static");

$(window).on("load", function () {
  $("#exampleModal").modal("show");
});

$("#exampleModal").on("show.bs.modal", function (event) {
  var modal = $(this);
  modal.find("#modal-title").html(`Welcome to level ${currentLevel + 1}`);
  modal
    .find("#modal-inner-text")
    .html(`Collect ${levelSettings[currentLevel].points} points in ${levelSettings[currentLevel].time} seconds`);
});

$("#exampleModal").on("hidden.bs.modal", function () {
  startNewGame();
});
