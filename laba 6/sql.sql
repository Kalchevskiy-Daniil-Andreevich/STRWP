CREATE TABLE weapons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  dps INTEGER
);

CREATE TABLE pizzas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  calories REAL
);

CREATE TABLE turtles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  color TEXT,
  weaponId INTEGER,
  favoritePizzaId INTEGER,
  secondFavoritePizzaId INTEGER,
  FOREIGN KEY (weaponId) REFERENCES weapons(id),
  FOREIGN KEY (favoritePizzaId) REFERENCES pizzas(id),
  FOREIGN KEY (secondFavoritePizzaId) REFERENCES pizzas(id)
);


SELECT * FROM turtles;
SELECT * FROM weapons;
SELECT * FROM pizzas;

ALTER TABLE turtles
ADD COLUMN image TEXT;


DELETE FROM turtles;
DELETE FROM weapons;
DELETE FROM pizzas;

-- Вставки для таблицы weapons
INSERT INTO weapons (name, dps) VALUES ('Katana', 120);
INSERT INTO weapons (name, dps) VALUES ('Nunchucks', 90);
INSERT INTO weapons (name, dps) VALUES ('Bo Staff', 80);
INSERT INTO weapons (name, dps) VALUES ('Sai', 100);
INSERT INTO weapons (name, dps) VALUES ('Shuriken', 60);

-- Вставки для таблицы pizzas
INSERT INTO pizzas (name, calories) VALUES ('Margherita', 250);
INSERT INTO pizzas (name, calories) VALUES ('Pepperoni', 300);
INSERT INTO pizzas (name, calories) VALUES ('Hawaiian', 350);
INSERT INTO pizzas (name, calories) VALUES ('Vegetarian', 280);
INSERT INTO pizzas (name, calories) VALUES ('BBQ Chicken', 400);

-- Вставки для таблицы turtles
INSERT INTO turtles (name, color, weaponId, favoritePizzaId, secondFavoritePizzaId) VALUES ('Leonardo', 'Blue', 1, 2, 5);
INSERT INTO turtles (name, color, weaponId, favoritePizzaId, secondFavoritePizzaId) VALUES ('Michelangelo', 'Orange', 2, 4, 1);
INSERT INTO turtles (name, color, weaponId, favoritePizzaId, secondFavoritePizzaId) VALUES ('Donatello', 'Purple', 3, 3, 4);
INSERT INTO turtles (name, color, weaponId, favoritePizzaId, secondFavoritePizzaId) VALUES ('Raphael', 'Red', 4, 1, 2);
INSERT INTO turtles (name, color, weaponId, favoritePizzaId, secondFavoritePizzaId) VALUES ('Splinter', 'Brown', NULL, 2, 3);


BEGIN TRANSACTION;

UPDATE pizzas
SET name = name || ' SUPER FAT!'
WHERE calories > 1500;

COMMIT;

SELECT * FROM pizzas;