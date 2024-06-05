const express = require('express');
const WeaponService = require('../services/weaponService');

const router = express.Router();

module.exports = function(db) {
    const weaponService = new WeaponService(db); 

    router.get('/weapons/:id', async (req, res) => {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        try {
            const weapon = await weaponService.getWeaponById(id);
            if (!weapon) {
                return res.status(404).json({ error: 'Weapon not found' });
            }
            res.json(weapon);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.get('/weapons', async (req, res) => {
        const { dps, n } = req.query;
        if (!dps && !n) {
            const weapons = await weaponService.getAllWeapons();
            res.json(weapons);
            return;
        }

        try {
            const weapons = await weaponService.getWeaponsByDps(dps, n);
            res.json(weapons);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.post('/weapons', async (req, res) => {
        const weaponData = req.body;
        try {
            if (weaponData.name && weaponData.dps) {
                if (weaponData.dps <= 500) {
                    const newWeaponId = await weaponService.createWeapon(weaponData);
                    res.json({ id: newWeaponId, message: 'Weapon created successfully' });
                } 
                else {
                    res.json({ message: 'DPS value is most high...' });
                }
            }
            else {
                res.json({ message: 'Some values is null' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.put('/weapons/:id', async (req, res) => {
        const { id } = req.params;
        const weaponData = req.body;
        try {
            if (weaponData.name && weaponData.dps) {
                if (weaponData.dps <= 500) {
                    const updatedRows = await weaponService.updateWeapon(id, weaponData);
                    if (updatedRows === 0) {
                        return res.status(404).json({ error: 'Weapon not found' });
                    }
                    res.json({ message: 'Weapon updated successfully' });
                }
                else {
                    res.json({ message: 'DPS value is most high...' });
                }
            }
            else {
                res.json({ message: 'Some values is null' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.delete('/weapons/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const deletedRows = await weaponService.deleteWeapon(id);
            if (deletedRows === 0) {
                return res.status(404).json({ error: 'Weapon not found' });
            }
            res.json({ message: 'Weapon deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}