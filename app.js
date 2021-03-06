const mysql = require('mysql2');

// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'Cookbook'
});

db.connect((err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log('Connection established');
});

db.query('SELECT FROM RecipeIngredient', (err,rows) => {
    if(err) throw err;

    let recipes_id, recipes = [];

    recipes = rows.forEach(row => {
        if(!recipes_id.includes(row.recipe_id)){
            recipes_id.push(row.recipe_id);
        }
    })


    console.log('Data received from Db:');
    console.log(rows);
    console.log(recipes_id);
});

db.end((err) => {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
});
