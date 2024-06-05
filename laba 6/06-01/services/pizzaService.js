class PizzaService {
    constructor(db) {
        this.db = db;
    }

    getAllPizzas() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM pizzas', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getPizzaById(id) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM pizzas WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    getPizzasByCalories(calories, m) {
        if (calories == "gt") {
            return new Promise((resolve, reject) => {
                this.db.all('SELECT * FROM pizzas WHERE calories > ?', [m], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                this.db.all('SELECT * FROM pizzas WHERE calories < ?', [m], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        }
    }

    getPizzasByCaloriesLessThan(m) {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM pizzas WHERE calories < ?', [m], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    createPizza(pizzaData) {
        return new Promise((resolve, reject) => {
            const { name, calories } = pizzaData;
            this.db.run('INSERT INTO pizzas (name, calories) VALUES (?, ?)', [name, calories], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    updatePizza(id, pizzaData) {
        return new Promise((resolve, reject) => {
            const { name, calories } = pizzaData;
            this.db.run('UPDATE pizzas SET name = ?, calories = ? WHERE id = ?', [name, calories, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    deletePizza(id) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM pizzas WHERE id = ?', [id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }
}

module.exports = PizzaService;
