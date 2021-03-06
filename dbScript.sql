-- start the server: $ mysqld --console
-- login:            $ mysql -u root --password=wxyz
-- run the script:   mysql> source /Users/javapro/dev/src/sql/Cookbook.sql
-- the script: 

drop database if exists Cookbook;

create database Cookbook; 

connect Cookbook; 
	
create table Recipe (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	name VARCHAR(25), 
	description VARCHAR(50), 
	preparation_time INT)
	ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table Ingredient (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	name VARCHAR(50)) 
	ENGINE=InnoDB DEFAULT CHARSET=utf8; 

create table Measure (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	name VARCHAR(30)) 
	ENGINE=InnoDB DEFAULT CHARSET=utf8; 

create table RecipeIngredient (recipe_id INT NOT NULL, 
	ingredient_id INT NOT NULL, 
	measure_id INT, 
	amount INT, 
	CONSTRAINT fk_recipe FOREIGN KEY(recipe_id) REFERENCES Recipe(id), 
	CONSTRAINT fk_ingredient FOREIGN KEY(ingredient_id) REFERENCES Ingredient(id), 
	CONSTRAINT fk_measure FOREIGN KEY(measure_id) REFERENCES Measure(id)) 
	ENGINE=InnoDB DEFAULT CHARSET=utf8; 

INSERT INTO Measure (name) VALUES('CUP'), ('TEASPOON'), ('TABLESPOON');

INSERT INTO Ingredient (name) VALUES('egg'), ('salt'), ('sugar'), ('chocolate'), ('vanilla extract'), ('flour');

INSERT INTO Recipe (name, description, preparation_time) VALUES('Boiled Egg', 'A single boiled egg', 5);

INSERT INTO Recipe (name, description, preparation_time) VALUES('Chocolate Cake', 'Yummy cake', 45);

INSERT INTO RecipeIngredient (recipe_id, ingredient_id, measure_id, amount) VALUES (1, 1, NULL, 1);

INSERT INTO RecipeIngredient (recipe_id, ingredient_id, measure_id, amount)  VALUES (2, 1, NULL, 3);

INSERT INTO RecipeIngredient (recipe_id, ingredient_id, measure_id, amount)  VALUES (2, 2, 2, 1);

INSERT INTO RecipeIngredient (recipe_id, ingredient_id, measure_id, amount)  VALUES (2, 3, 1, 2);

INSERT INTO RecipeIngredient (recipe_id, ingredient_id, measure_id, amount)  VALUES (2, 4, 1, 1);

SELECT r.name AS 'Recipe', 
	r.preparation_time, 
	ri.amount AS 'Amount', 
	mu.name AS 'Unit of Measure', 
	i.name AS 'Ingredient' 
FROM Recipe r 
JOIN RecipeIngredient ri on r.id = ri.recipe_id 
JOIN Ingredient i on i.id = ri.ingredient_id 
LEFT OUTER JOIN Measure mu on mu.id = measure_id;
