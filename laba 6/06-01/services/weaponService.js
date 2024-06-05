class WeaponService {
    constructor(db) {
        this.db = db;
    }

    getAllWeapons() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM weapons', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getWeaponById(id) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM weapons WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    getWeaponsByDps(dps, n) {
        if (dps == "gt") {
            return new Promise((resolve, reject) => {
                this.db.all('SELECT * FROM weapons WHERE dps > ?', [n], (err, rows) => {
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
                this.db.all('SELECT * FROM weapons WHERE dps < ?', [n], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        }
    }

    createWeapon(weaponData) {
        return new Promise((resolve, reject) => {
            const { name, dps } = weaponData;
            this.db.run('INSERT INTO weapons (name, dps) VALUES (?, ?)', [name, dps], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    updateWeapon(id, weaponData) {
        return new Promise((resolve, reject) => {
            const { name, dps } = weaponData;
            this.db.run('UPDATE weapons SET name = ?, dps = ? WHERE id = ?', [name, dps, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    deleteWeapon(id) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM weapons WHERE id = ?', [id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }
}

module.exports = WeaponService;