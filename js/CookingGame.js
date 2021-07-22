class CookingGame {
  constructor(baseIngredients, randomIngredients, maxPoints, recipeLength, oneLevelIngredients) {
    this.baseIngredients = baseIngredients;
    this.randomIngredients = randomIngredients;
    this.maxPoints = maxPoints;
    this.recipeLength = recipeLength;
    this.randomRecipe = [];
    this.playerPoints = 0;
    this.oneLevelIngredients = oneLevelIngredients;
  }

  createRandomRecipe() {
    this.randomRecipe.unshift(this.baseIngredients[0]);
    let oneLevelIngredientsArray = this.randomIngredients.slice(0, this.oneLevelIngredients - 1);

    for (let i = 0; this.randomRecipe.length < this.recipeLength; i++) {
      let randomIngredient = oneLevelIngredientsArray[Math.floor(Math.random() * oneLevelIngredientsArray.length)];
      const result = this.randomRecipe.includes(randomIngredient);

      if (!result) {
        this.randomRecipe.unshift(randomIngredient);
      }
    }
    return this.randomRecipe;
  }
}

export default CookingGame;
