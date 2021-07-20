class CookingGame {
  constructor(baseIngredients, randomIngredients, maxPoints, recipeLength) {
    this.baseIngredients = baseIngredients;
    this.randomIngredients = randomIngredients;
    this.maxPoints = maxPoints;
    this.recipeLength = recipeLength;
    this.randomRecipe = [];
    this.playerPoints = 0;
  }

  createRandomRecipe() {
    this.randomRecipe.unshift(this.baseIngredients[0]);

    for (let i = 0; this.randomRecipe.length < this.recipeLength; i++) {
      let randomIngredient = this.randomIngredients[Math.floor(Math.random() * this.randomIngredients.length)];
      const result = this.randomRecipe.includes(randomIngredient);

      if (!result) {
        this.randomRecipe.unshift(randomIngredient);
      }
    }
    return this.randomRecipe;
  }
}

export default CookingGame;
