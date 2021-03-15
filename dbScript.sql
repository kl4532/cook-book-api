-- run the script:   docker exec -i cookBook  mysql -uroot -ptest < dbScript.sql
-- the script:

drop database if exists Cookbook;

create database Cookbook;

connect Cookbook;
	
create table recipe (id BIGINT NOT NULL PRIMARY KEY,
	name VARCHAR(25), 
	description VARCHAR(2000),
	preparation_time INT)
	ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table ingredient (id BIGINT NOT NULL PRIMARY KEY,
	name VARCHAR(50),
	amount FLOAT,
	unit VARCHAR(20))
	ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table recipeingredient (recipe_id BIGINT NOT NULL,
	ingredient_id BIGINT NOT NULL,
	CONSTRAINT fk_recipe FOREIGN KEY(recipe_id) REFERENCES recipe(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_ingredient FOREIGN KEY(ingredient_id) REFERENCES ingredient(id) ON DELETE CASCADE ON UPDATE CASCADE)
	ENGINE=InnoDB DEFAULT CHARSET=utf8; 

#
# SELECT r.name AS 'Recipe',
# 	r.preparation_time,
# 	i.name AS 'Ingredient'
# FROM Recipe r
# JOIN RecipeIngredient ri on r.id = ri.recipe_id
# JOIN Ingredient i on i.id = ri.ingredient_id;
