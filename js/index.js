import Chronometer from "./Chronometer.js";
import CookingGame from "./CookingGame.js";
import { baseIngredientsTaco, randomIngredientsTaco, baseIngredientsBurger, randomIngredientsBurger } from "./data.js";

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
}

// initial game setup
let currentLevel = 1;
let gameTime = 45;
let gamePoints = 50;
let gameRecipeLength = 4;

const allIngredients = baseIngredients.concat(randomIngredients);
const arrayOfAvailableIngredients = allIngredients;
const cookingGame = new CookingGame(baseIngredients, randomIngredients, gamePoints, gameRecipeLength);
const chronometer = new Chronometer(gameTime);

function startNewGame() {
  // if (currentLevel === 2) {
  //   gameTime = 45;
  //   gamePoints = 60;
  // }
  const recipe = cookingGame.createRandomRecipe();
  renderIngredientsList(arrayOfAvailableIngredients);
  renderRecipe(recipe);
  chronometer.start(printTime);
}

function renderRecipe(recipe) {
  recipe.forEach((item) => {
    const randomRecipeItem = document.createElement("li");
    randomCombinationElm.appendChild(randomRecipeItem);
    randomRecipeItem.setAttribute("style", `background-image: url("${item.img}")`);
  });
}

function renderIngredientsList(arrayOfAvailableIngredients) {
  for (let i = 0; i < arrayOfAvailableIngredients.length; i++) {
    const listedIngredient = document.createElement("li");
    listOfAllIngredientsElm.appendChild(listedIngredient);
    listedIngredient.setAttribute("class", "ingredient");
    listedIngredient.setAttribute("style", `background-image: url("${arrayOfAvailableIngredients[i].img}")`);
    listedIngredient.setAttribute("data-ingredient", arrayOfAvailableIngredients[i].name);
  }
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
    displayPoints();
    if (checkIfWon()) {
      alert(`WOW, YOU WON THE GAME!!`);
      cookingGame.randomRecipe = [];
      randomCombinationElm.innerHTML = "";
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
    currentLevel++;
    $("#exampleModal").modal("show");
    chronometer.stop();
    secDecElement.innerHTML = 0;
    secUniElement.innerHTML = 0;
    return true;
  }
}

// TIMER
const secDecElement = document.getElementById("secDec");
const secUniElement = document.getElementById("secUni");

function printTime() {
  if (chronometer.currentTime < 1) {
    chronometer.stop();
    secDecElement.innerHTML = 0;
    secUniElement.innerHTML = 0;

    cookingGame.randomRecipe = [];
    randomCombinationElm.innerHTML = "";
    clearPlayerSelection();
    cookingGame.randomRecipe = [];
    randomCombinationElm.innerHTML = "";
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

// MODAL
const modalElm = document.getElementById("exampleModal");
modalElm.setAttribute("data-backdrop", "static");

$(window).on("load", function () {
  $("#exampleModal").modal("show");
});

$("#exampleModal").on("show.bs.modal", function (event) {
  var modal = $(this);
  // if (currentLevel === 1) {
  modal.find("#modal-title").html(`Welcome to level ${currentLevel}`);
  modal.find("#modal-inner-text").html(`Collect ${gamePoints} points in ${gameTime} seconds`);
  // }
  // var button = $(event.relatedTarget) // Button that triggered the modal
  // var recipient = button.data('whatever') // Extract info from data-* attributes
  // // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  // var modal = $(this);
  // modal.find("#modal-title").html(`Welcome to level ${currentLevel}`);
  // modal.find("#modal-inner-text").html(`Collect ${gamePoints} points in ${gameTime} seconds`);
  // modal.find('.modal-body input').val(recipient)
});

$("#exampleModal").on("hidden.bs.modal", function () {
  startNewGame();
});

/*
if (points > 400) {
  currentLevel++;
  $("#exampleModal").modal("show");
}
*/
