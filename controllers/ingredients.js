const db = require('../utils/database-connection')

exports.getIngredientsForRecipe = (req, res) => {
    const sql = `SELECT i.id, i.name, i.amount, i.unit FROM RecipeIngredient ri JOIN Ingredient i ON i.id = ri.ingredient_id WHERE ri.recipe_id = ${req.params.id};`;
    db.query(sql, (err,rows) => {
        if(err) throw err;
        const ingredients = rows.map(row => {
            return {
                _id: row.id,
                name: row.name,
                amount: row.amount,
                unit: row.unit
            }
        });
        console.log(`Recived ingredients: ${ingredients}`);
        res.json({ingredients: ingredients});
    });
};
