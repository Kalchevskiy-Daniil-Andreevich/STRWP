const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './KDA.sqlite'
});

const Weapon = sequelize.define('weapons', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  dps: Sequelize.INTEGER
});

const Pizza = sequelize.define('pizzas', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  calories: Sequelize.DOUBLE
});

const Turtle = sequelize.define('turtles', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  weaponId: { type: Sequelize.INTEGER, references: { model: Weapon, key: 'id' } },
  favoritePizzaId: { type: Sequelize.INTEGER, references: { model: Pizza, key: 'id' } },
  secondFavoritePizzaId: { type: Sequelize.INTEGER, references: { model: Pizza, key: 'id' } }
});

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);

    Weapon.create({ name: 'Sword', dps: 100 });
    Pizza.create({ name: 'Pepperoni', calories: 250.0 });
    Turtle.create({ name: 'Leonardo', color: 'Blue', weaponId: 1, favoritePizzaId: 1, secondFavoritePizzaId: 1 });
  });