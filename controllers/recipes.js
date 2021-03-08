const db = require('../utils/database-connection')

exports.getAllRecipes = (req, res) => {
    const sql = `SELECT r.id, r.name, r.description, r.preparation_time FROM Recipe r;`;
    db.query(sql, (err,rows) => {
        if(err) throw err;
        console.log(`Data received from Db: ${rows}`);
        res.json(rows);
    });
};

exports.getRecipe = (req, res) => {
    const sql = `SELECT r.name, r.description, r.preparation_time FROM Recipe r WHERE id = ${req.params.id};`;
    db.query(sql, (err,rows) => {
        if(err) throw err;
        console.log(`Data received from Db: ${rows}`);
        res.json(rows);
    });
};

exports.addRecipe = (req, res) => {
    if(!req.body) {
        res.status(400).send({ message: "Recipe body can not be empty!" });
        return;
    }
    const sqlRecipe = `INSERT INTO Recipe (id, name, description, preparation_time)
                VALUES ('${req.body._id}', '${req.body.name}', '${req.body.description}', ${req.body.preparationTimeInMinutes});`;


    db.query(sqlRecipe, req.body, (err, rows) => {
        if(err) throw err;
        console.log(`Data added ${rows}`);
        res.json(req.body);
    })

    for (const ing of req.body.ingredients) {
        const sqlIngredients = `INSERT INTO Ingredient (id, name, amount, unit)
                VALUES ('${ing._id}', '${ing.name}', ${ing.amount}, '${ing.unit}');`;

        db.query(sqlIngredients, req.body, (err, rows) => {
            console.log('ing', `'${ing._id}', '${ing.name}', ${ing.amount}, '${ing.unit}'`)
            if(err) throw err;
        })

        const sqlRecipeIngredient = `INSERT INTO RecipeIngredient (recipe_id, ingredient_id) VALUES ('${req.body._id}', '${ing._id}');`;
        db.query(sqlRecipeIngredient, req.body, (err, rows) => {
            if(err) throw err;
        })
    }

};

exports.updateRecipe = (req, res) => {
    const sql = `UPDATE Recipe SET ? WHERE id=${req.params.id}`;
    db.query(sql, req.body, (err, rows) => {
        if(err) throw err;
        console.log(`Data updated ${rows}`);
        res.json(req.body);
    })
};

exports.deleteRecipe = (req, res) => {
    const sql = `DELETE FROM Recipe WHERE id=${req.params.id}`;
    db.query(sql,(err, rows) => {
        if(err) throw err;
        console.log(`Data deleted ${rows}`);
        res.send({message: `Element with id: {req.params.id} was deleted`});
    })
};
