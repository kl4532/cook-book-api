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

    // Ingredients

    // router.get("/ingredients", recipes.getAllRecipes);
    //
    // router.post("/ingredients", recipes.addRecipe);
    //
    router.get("/ingredients/:id", ingredients.getIngredientsForRecipe);
    //
    // router.put("/ingredients/:id", recipes.updateRecipe);
    //
    // router.delete("/ingredients/:id", recipes.deleteRecipe);

    app.use('/api', router);
};
