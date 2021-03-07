const mysql = require('mysql2');
const express = require('express');
const config = require('./dbConfig.js');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = '3000';

const db = mysql.createConnection(config);


// Connect to db
db.connect((err) => {
    if(err) throw err;
    console.log(`Connected with ${config.database}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})

app.get('/recipes', (req,res) => {
    const sql = `SELECT r.name, r.description, r.preparation_time FROM Recipe r;`;
    db.query(sql, (err,rows) => {
        if(err) throw err;
        console.log('Data received from Db:');
        res.json(rows);
    });
})

app.get('/recipes/:id', (req,res) => {
    const sql = `SELECT r.name, r.description, r.preparation_time FROM Recipe r WHERE id = ${req.params.id};`;
    db.query(sql, (err,rows) => {
        if(err) throw err;
        console.log('Data received from Db:');
        res.json(rows);
    });
})

app.post('/recipes', (req,res) => {
    const sql = `INSERT INTO Recipe SET ?`;
    db.query(sql, req.body, (err, rows) => {
        if(err) throw err;
        res.json(req.body);
    })
})

app.put('/recipes/:id', (req,res) => {
    const sql = `UPDATE Recipe SET ? WHERE id=${req.params.id}`;
    db.query(sql, req.body, (err, rows) => {
        if(err) throw err;
        res.json(req.body);
    })
})

app.delete('/recipes/:id', (req,res) => {
    const sql = `DELETE FROM Recipe WHERE id=${req.params.id}`;
    db.query(sql,(err, rows) => {
        if(err) throw err;
        res.send({message: `Element with id: {req.params.id} was deleted`});
    })
})


// SELECT ri.recipe_id, r.name, r.description, r.preparation_time, i.name FROM
// RecipeIngredient ri JOIN Ingredient i ON i.id = ri.ingredient_id JOIN Recipe r ON
// r.id = ri.recipe_id
