module.exports = app => {
    const recipes = require("../controllers/recipes.js");
    const ingredients = require("../controllers/ingredients.js");

    const router = require("express").Router();

    // Recipes

    router.get("/recipes", recipes.getAllRecipes);

    router.post("/recipes", recipes.addRecipe);

    router.get("/recipes/:id", recipes.getRecipe);

    router.put("/recipes/:id", recipes.updateRecipe);

    router.delete("/recipes/:id", recipes.deleteRecipe);

    router.get("/ingredients/:id", ingredients.getIngredientsForRecipe);

    router.get("/ingredients", ingredients.getAllIngredients);

    app.use('/api', router);
};
