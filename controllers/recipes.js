const db = require('../utils/database-connection')

exports.getAllRecipes = (req, res) => {
    const sql = `SELECT r.name, r.description, r.preparation_time FROM Recipe r;`;
    db.query(sql, (err,rows) => {
        if(err) throw err;
        console.log('Data received from Db:');
        res.json(rows);
    });
};

exports.getRecipe = (req, res) => {
    const sql = `SELECT r.name, r.description, r.preparation_time FROM Recipe r WHERE id = ${req.params.id};`;
    db.query(sql, (err,rows) => {
        if(err) throw err;
        console.log('Data received from Db:');
        res.json(rows);
    });
};

exports.addRecipe = (req, res) => {
    if(!req.body) {
        res.status(400).send({ message: "Recipe body can not be empty!" });
        return;
    }
    const sql = `INSERT INTO Recipe SET ?`;
    db.query(sql, req.body, (err, rows) => {
        if(err) throw err;
        res.json(req.body);
    })
};

exports.updateRecipe = (req, res) => {
    const sql = `UPDATE Recipe SET ? WHERE id=${req.params.id}`;
    db.query(sql, req.body, (err, rows) => {
        if(err) throw err;
        res.json(req.body);
    })
};

exports.deleteRecipe = (req, res) => {
    const sql = `DELETE FROM Recipe WHERE id=${req.params.id}`;
    db.query(sql,(err, rows) => {
        if(err) throw err;
        res.send({message: `Element with id: {req.params.id} was deleted`});
    })
};
