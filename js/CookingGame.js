class CookingGame {
  constructor(baseIngredients, randomIngredient, maxPoints, recipeLength) {
    this.baseIngredients = baseIngredients;
    this.randomIngredient = randomIngredient;
    this.maxPoints = maxPoints;
    this.recipeLength = recipeLength;
    this.randomRecipe = [];
    this.playerPoints = 0;
  }

  createRandomRecipe() {
    this.randomRecipe.unshift(this.baseIngredients[0]);

    for (let i = 0; this.randomRecipe.length < this.recipeLength; i++) {
      let randomIngredient = this.randomIngredient[Math.floor(Math.random() * this.randomIngredient.length)];
      const result = this.randomRecipe.includes(randomIngredient);

      if (!result) {
        this.randomRecipe.unshift(randomIngredient);
      }
    }
    return this.randomRecipe;
  }
}

export default CookingGame;
