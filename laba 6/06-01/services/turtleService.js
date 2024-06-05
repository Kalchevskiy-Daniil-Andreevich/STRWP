class TurtleService {
    constructor(db) {
        this.db = db;
    }

    getAllTurtles() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM turtles', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getTurtleById(id) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM turtles WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    getTurtlesByFavoritePizza(pizzaName) {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM turtles WHERE favoritePizzaId = (SELECT id FROM pizzas WHERE name = ?)', [pizzaName], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    createTurtle(turtleData) {
        return new Promise((resolve, reject) => {
            const { name, color, weaponId, favoritePizzaId, secondFavoritePizzaId } = turtleData;
            this.db.run('INSERT INTO turtles (name, color, weaponId, favoritePizzaId, secondFavoritePizzaId) VALUES (?, ?, ?, ?, ?)', [name, color, weaponId, favoritePizzaId, secondFavoritePizzaId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    updateTurtle(id, turtleData) {
        return new Promise((resolve, reject) => {
            const { name, color, weaponId, favoritePizzaId, secondFavoritePizzaId } = turtleData;
            this.db.run('UPDATE turtles SET name = ?, color = ?, weaponId = ?, favoritePizzaId = ?, secondFavoritePizzaId = ? WHERE id = ?', [name, color, weaponId, favoritePizzaId, secondFavoritePizzaId, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    deleteTurtle(id) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM turtles WHERE id = ?', [id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    async bindFavoritePizza(turtleId, pizzaId) {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE turtles SET favoritePizzaId = ? WHERE id = ?', [pizzaId, turtleId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    async bindSecondFavoritePizza(turtleId, pizzaId) {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE turtles SET secondFavoritePizzaId = ? WHERE id = ?', [pizzaId, turtleId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    async bindWeapon(turtleId, weaponId) {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE turtles SET weaponId = ? WHERE id = ?', [weaponId, turtleId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    async unbindFavoritePizza(turtleId) {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE turtles SET favoritePizzaId = NULL WHERE id = ?', [turtleId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    async unbindSecondFavoritePizza(turtleId) {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE turtles SET secondFavoritePizzaId = NULL WHERE id = ?', [turtleId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    async unbindWeapon(turtleId) {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE turtles SET weaponId = NULL WHERE id = ?', [turtleId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }
}

module.exports = TurtleService;