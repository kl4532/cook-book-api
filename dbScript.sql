-- save script as db.sql
-- run the script:   docker exec -i cookBook  mysql -uroot -ptest < db.sql
-- the script:

drop database if exists Cookbook;

create database Cookbook;

connect Cookbook;
	
create table Recipe (id VARCHAR(50) NOT NULL PRIMARY KEY,
	name VARCHAR(25), 
	description VARCHAR(50), 
	preparation_time INT)
	ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table Ingredient (id VARCHAR(50) NOT NULL PRIMARY KEY,
	name VARCHAR(50),
	amount FLOAT,
	unit VARCHAR(20))
	ENGINE=InnoDB DEFAULT CHARSET=utf8;

# create table Measure (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
# 	name VARCHAR(30))
# 	ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table RecipeIngredient (recipe_id VARCHAR(50) NOT NULL,
	ingredient_id VARCHAR(50) NOT NULL,
	CONSTRAINT fk_recipe FOREIGN KEY(recipe_id) REFERENCES Recipe(id), 
	CONSTRAINT fk_ingredient FOREIGN KEY(ingredient_id) REFERENCES Ingredient(id))
	ENGINE=InnoDB DEFAULT CHARSET=utf8; 

# INSERT INTO Ingredient (name, amount, unit) VALUES('egg', 1, 'piece'), ('salt', 2, 'g'), ('sugar', 10, 'g'), ('chocolate', 100, 'g'), ('vanilla extract', 10, 'g'), ('flour', 100, 'g');
#
# INSERT INTO Recipe (name, description, preparation_time) VALUES('Boiled Egg', 'A single boiled egg', 5);
#
# INSERT INTO Recipe (name, description, preparation_time) VALUES('Chocolate Cake', 'Yummy cake', 45);
#
# INSERT INTO RecipeIngredient (recipe_id, ingredient_id) VALUES ('1', '1');
#
# INSERT INTO RecipeIngredient (recipe_id, ingredient_id)  VALUES ('2', '6');
#
# INSERT INTO RecipeIngredient (recipe_id, ingredient_id)  VALUES ('2', '2');
#
# INSERT INTO RecipeIngredient (recipe_id, ingredient_id)  VALUES ('2', '3');
#
# INSERT INTO RecipeIngredient (recipe_id, ingredient_id)  VALUES ('2', '4');
#
# SELECT r.name AS 'Recipe',
# 	r.preparation_time,
# 	i.name AS 'Ingredient'
# FROM Recipe r
# JOIN RecipeIngredient ri on r.id = ri.recipe_id
# JOIN Ingredient i on i.id = ri.ingredient_id;
