const db = require('../utils/database-connection')

exports.getAllIngredients = async function(req, res) {
    const sql = `SELECT ri.recipe_id, i.id, i.name, i.amount, i.unit FROM recipeingredient ri JOIN ingredient i ON i.id = ri.ingredient_id;`;

    try {
        let result = await db.query(sql);
        // console.log(`Recived ingredients: ${ingredients}`);
        res.json({ingredients: result[0]});
    } catch (err) {
        console.log(`${err.code}->${err.message}`);
        return res.status(500).json(err);
    }
};

exports.getIngredientsForRecipe = async function(req, res) {
    const sql = `SELECT i.id, i.name, i.amount, i.unit FROM recipeingredient ri JOIN ingredient i ON i.id = ri.ingredient_id WHERE ri.recipe_id = ${req.params.id};`;

    try {
        let result = await db.query(sql);
        // console.log(`Recived ingredients: ${ingredients}`);
        res.json({ingredients: result[0]});
    } catch (err) {
        console.log(`${err.code}->${err.message}`);
        return res.status(500).json(err);
    }
};
