const db = require('../utils/database-connection')

// TODO: try to refactor try-catch blocks with this function
async function querySql(sql, res, successMessage) {
    try {
        const result = await db.query(sql);
        console.log(successMessage);
    } catch (err) {
        console.log(`${err.code}->${err.message}`);
        return res.status(500).json(err);
    }
}

exports.getAllRecipes = async function (req, res){
    const sql = `SELECT r.id, r.name, r.description, r.preparation_time FROM recipe r;`;
    // await querySql(sql, res, 'Recipes fetched');
    try {
        const result = await db.query(sql);
        res.json(result[0]);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.getRecipe = async function(req, res) {
    const sql = `SELECT r.name, r.description, r.preparation_time FROM recipe r WHERE id = '${req.params.id}';`;
    try {
        const result = await db.query(sql);
        if(result[0].length === 0) {
            console.log(`Recipe with id:${req.params.id} not found...`);
            res.status(404).json(result[0]);
        } else {
            res.json(result[0]);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.addRecipe = async function(req, res) {

    if(!req.body) {
        res.status(400).send({ message: "Recipe body can not be empty!" });
        return;
    }
    const sqlRecipe = `INSERT INTO recipe (id, name, description, preparation_time)
                VALUES (${req.body._id}, '${req.body.name}', '${req.body.description}', ${req.body.preparationTimeInMinutes});`;

    try {
        await db.query(sqlRecipe);
        console.log('Recipe added');
    } catch (err) {
        console.log(`${err.code}->${err.message}`);
        return res.status(500).json(err);
    }

    for (const ing of req.body.ingredients) {

        const sqlIngredient = `INSERT INTO ingredient (id, name, amount, unit)
                VALUES ('${ing._id}', '${ing.name}', ${ing.amount}, '${ing.unit}');`;
        const sqlRecipeIngredient = `INSERT INTO recipeingredient (recipe_id, ingredient_id) VALUES ('${req.body._id}', '${ing._id}');`;

        try{
            await db.query(`${sqlIngredient}`);
            console.log(`Ingredient added`);
        } catch (err) {
            console.log(`${err.code}->${err.message}`);
            return res.status(500).json(err);
        }

        try{
            await db.query(`${sqlRecipeIngredient}`);
            console.log(`Ingredient added to recipeingredient`);
        } catch (err) {
            console.log(`${err.code}->${err.message}`);
            return res.status(500).json(err);
        }
    }

    res.json(req.body);

};

exports.updateRecipe = async function (req, res) {

    // update basic recipe
    const sql = `UPDATE recipe SET 
     name='${req.body.name}',
     preparation_time='${req.body.preparationTimeInMinutes}',
     description='${req.body.description}' 
     WHERE id = ${req.params.id}`;

    try{
        await db.query(sql);
        console.log(`Recipe updated`);
    } catch (err) {
        console.log(`${err.code}->${err.message}`);
        return res.status(500).json(err);
    }

    // remove all old ingredients from RecipeIngredient...
    let sqlRRI = `DELETE FROM recipeingredient WHERE recipe_id = ${req.body._id}`;
    try{
        await db.query(sqlRRI);
        console.log(`Ingredient deleted`);
    } catch (err) {
        console.log(`${err.code}->${err.message}`);
        return res.status(500).json(err);
    }

    // ... and ingredient table
    let sqlRI = 'DELETE FROM ingredient WHERE id NOT IN (SELECT ingredient_id FROM recipeingredient)';
    try{
        await db.query(sqlRI);
        console.log(`Ingredient deleted`);
    } catch (err) {
        console.log(`${err.code}->${err.message}`);
        return res.status(500).json(err);
    }

    // add new ingredients
    for(const ing of req.body.ingredients) {

        const sqlCrI = `INSERT INTO ingredient (id, name, amount, unit) VALUES ('${ing._id}', '${ing.name}', ${ing.amount}, '${ing.unit}');`;
        try{
            await db.query(sqlCrI);
            console.log(`Ingredients deleted`);
        } catch (err) {
            console.log(`${err.code}->${err.message}`);
            return res.status(500).json(err);
        }

        const sqlCrRI = `INSERT INTO recipeingredient (recipe_id, ingredient_id) VALUES ('${req.body._id}', '${ing._id}');`;
        try{
            await db.query(sqlCrRI);
            console.log(`Ingredients deleted`);
        } catch (err) {
            console.log(`${err.code}->${err.message}`);
            return res.status(500).json(err);
        }
    }
    res.json(req.body);
};

exports.deleteRecipe = async function(req, res) {

    const sql = `DELETE FROM recipe WHERE id = ${req.params.id}`;

    try{
        await db.query(sql);
        console.log(`Data deleted ${req.params.id}`);
    } catch (err) {
        console.log(`${err.code}->${err.message}`);
        return res.status(500).json(err);
    }

    // remove ingredient orphans
    const sqlRI = 'DELETE FROM ingredient WHERE id NOT IN (SELECT ingredient_id FROM recipeingredient)';
    try{
        await db.query(sqlRI);
        console.log(`Data deleted ${req.params.id}`);
    } catch (err) {
        console.log(`${err.code}->${err.message}`);
        return res.status(500).json(err);
    }

    res.json(`Recipe ${req.params.id} deleted`);

};
