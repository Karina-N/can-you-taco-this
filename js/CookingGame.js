class CookingGame {
  constructor(allIngredientsArray, maxPoints, recipeLength) {
    this.allIngredientsArray = allIngredientsArray;
    this.maxPoints = maxPoints;
    this.recipeLength = recipeLength;
    this.randomRecipe = [];
    this.playerPoints = 0;
  }

  createRandomRecipe() {
    for (let i = 0; i < this.recipeLength; i++) {
      let randomIngredient = this.allIngredientsArray[Math.floor(Math.random() * this.allIngredientsArray.length)];
      const result = this.randomRecipe.some((item) => item.name === randomIngredient.name);
      if (!result) {
        this.randomRecipe.unshift(randomIngredient);
      }
    }
    return this.randomRecipe;
  }
}

export default CookingGame;
