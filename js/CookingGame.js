class CookingGame {
  constructor(baseIngredient, allIngredientsArray, maxPoints, recipeLength) {
    this.baseIngredient = baseIngredient;
    this.allIngredientsArray = allIngredientsArray;
    this.maxPoints = maxPoints;
    this.recipeLength = recipeLength;
    this.randomRecipe = [];
    this.playerPoints = 0;
  }

  createRandomRecipe() {
    this.randomRecipe.unshift(this.baseIngredient);
    for (let i = 0; this.randomRecipe.length < this.recipeLength; i++) {
      let randomIngredient = this.allIngredientsArray[Math.floor(Math.random() * this.allIngredientsArray.length)];
      const result = this.randomRecipe.includes(randomIngredient);

      if (!result) {
        this.randomRecipe.unshift(randomIngredient);
      }
    }
    return this.randomRecipe;
  }
}

export default CookingGame;
